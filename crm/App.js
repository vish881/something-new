
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  SafeAreaView,
  StatusBar,
} from 'react-native';

// DATA
const initialLeads = [
  { id: '1', name: 'Rahul Sharma', company: 'Tech Solutions', status: 'New', amount: 25000 },
  { id: '2', name: 'Priya Verma', company: 'Digital World', status: 'Contacted', amount: 40000 },
  { id: '3', name: 'Aman Gupta', company: 'Web Creators', status: 'Converted', amount: 60000 },
  { id: '4', name: 'Neha Singh', company: 'Creative Studio', status: 'New', amount: 18000 },
];

const initialEmployees = [
  { id: '1', name: 'Rahul Sharma', department: 'Sales', present: true, checkIn: '09:15 AM' },
  { id: '2', name: 'Priya Verma', department: 'Marketing', present: true, checkIn: '09:30 AM' },
  { id: '3', name: 'Aman Gupta', department: 'Development', present: false, checkIn: '--' },
  { id: '4', name: 'Neha Singh', department: 'HR', present: true, checkIn: '09:05 AM' },
];

const initialTasks = [
  { id: '1', title: 'Call Rahul Sharma', time: '10:30 AM', done: false },
  { id: '2', title: 'Send project proposal', time: '12:00 PM', done: false },
  { id: '3', title: 'Follow up with Priya', time: '03:00 PM', done: true },
];

const initialActivities = [
  { id: '1', title: 'New lead added', detail: 'Rahul Sharma', time: '09:15 AM' },
  { id: '2', title: 'Meeting completed', detail: 'Priya Verma', time: '10:30 AM' },
  { id: '3', title: 'Client converted', detail: 'Aman Gupta', time: '11:45 AM' },
];

export default function App() {
  const [screen, setScreen] = useState('Dashboard');
  const [leads, setLeads] = useState(initialLeads);
  const [employees, setEmployees] = useState(initialEmployees);
  const [tasks, setTasks] = useState(initialTasks);
  const [activities, setActivities] = useState(initialActivities);

  const [search, setSearch] = useState('');
  const [newName, setNewName] = useState('');
  const [newCompany, setNewCompany] = useState('');

  // ACTIVITY LOGGER
  const addActivity = (title, detail) => {
    const activity = {
      id: Date.now().toString(),
      title,
      detail,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setActivities(previous => [activity, ...previous]);
  };

  // ADD LEAD
  const addLead = () => {
    if (!newName.trim() || !newCompany.trim()) return;

    const lead = {
      id: Date.now().toString(),
      name: newName.trim(),
      company: newCompany.trim(),
      status: 'New',
      amount: 0,
    };

    setLeads(previous => [...previous, lead]);
    addActivity('New lead added', lead.name);

    setNewName('');
    setNewCompany('');
  };

  // CHANGE LEAD STATUS
  const changeLeadStatus = (id) => {
    const statuses = ['New', 'Contacted', 'Converted'];

    const lead = leads.find(item => item.id === id);
    if (!lead) return;

    const nextStatus = statuses[
      (statuses.indexOf(lead.status) + 1) % statuses.length
    ];

    setLeads(previous =>
      previous.map(item =>
        item.id === id ? { ...item, status: nextStatus } : item
      )
    );

    addActivity('Lead status updated', `${lead.name}: ${nextStatus}`);
  };

  // TASK MANAGEMENT
  const toggleTask = (id) => {
    const task = tasks.find(item => item.id === id);
    if (!task) return;

    setTasks(previous =>
      previous.map(item =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );

    addActivity(
      task.done ? 'Task reopened' : 'Task completed',
      task.title
    );
  };

  // ATTENDANCE MANAGEMENT
  const toggleAttendance = (id) => {
    const employee = employees.find(item => item.id === id);
    if (!employee) return;

    const newStatus = !employee.present;

    setEmployees(previous =>
      previous.map(item =>
        item.id === id
          ? {
              ...item,
              present: newStatus,
              checkIn: newStatus
                ? new Date().toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                : '--',
            }
          : item
      )
    );

    addActivity(
      newStatus ? 'Employee checked in' : 'Employee checked out',
      employee.name
    );
  };

  // SEARCH
  const filteredLeads = leads.filter(lead =>
    lead.name.toLowerCase().includes(search.toLowerCase()) ||
    lead.company.toLowerCase().includes(search.toLowerCase())
  );

  // DASHBOARD CALCULATIONS
  const converted = leads.filter(item => item.status === 'Converted').length;
  const presentCount = employees.filter(item => item.present).length;
  const pendingTasks = tasks.filter(item => !item.done).length;
  const revenue = leads.reduce((total, item) => total + item.amount, 0);

  // REUSABLE CARDS
  const StatCard = ({ title, value, color }) => (
    <View style={styles.statCard}>
      <Text style={styles.statTitle}>{title}</Text>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
    </View>
  );

  const LeadCard = ({ lead }) => (
    <View style={styles.leadCard}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {lead.name.charAt(0).toUpperCase()}
        </Text>
      </View>

      <View style={styles.leadInfo}>
        <Text style={styles.leadName}>{lead.name}</Text>
        <Text style={styles.company}>{lead.company}</Text>
        <Text style={styles.amount}>
          ₹{lead.amount.toLocaleString('en-IN')}
        </Text>
      </View>

      <Pressable
        onPress={() => changeLeadStatus(lead.id)}
        style={[
          styles.status,
          lead.status === 'Converted'
            ? styles.green
            : lead.status === 'Contacted'
            ? styles.orange
            : styles.blue,
        ]}
      >
        <Text style={styles.statusText}>{lead.status}</Text>
      </Pressable>
    </View>
  );

  const ActivityCard = ({ activity }) => (
    <View style={styles.activityCard}>
      <View style={styles.activityDot} />
      <View style={{ flex: 1 }}>
        <Text style={styles.leadName}>{activity.title}</Text>
        <Text style={styles.company}>{activity.detail}</Text>
        <Text style={styles.activityTime}>{activity.time}</Text>
      </View>
    </View>
  );

  // DASHBOARD
  const renderDashboard = () => (
    <>
      <Text style={styles.sectionTitle}>Business Overview</Text>

      <View style={styles.statsGrid}>
        <StatCard title="Total Leads" value={leads.length} color="#2563EB" />
        <StatCard title="Converted" value={converted} color="#16A34A" />
        <StatCard title="Employees" value={employees.length} color="#7C3AED" />
        <StatCard title="Pending Tasks" value={pendingTasks} color="#EA580C" />
      </View>

      <View style={styles.revenueCard}>
        <Text style={styles.revenueLabel}>Potential Revenue</Text>
        <Text style={styles.revenueValue}>
          ₹{revenue.toLocaleString('en-IN')}
        </Text>
        <Text style={styles.revenueNote}>Total value of your leads</Text>
      </View>

      <View style={styles.attendanceSummary}>
        <View>
          <Text style={styles.sectionTitle}>Today's Attendance</Text>
          <Text style={styles.company}>Employees present</Text>
        </View>
        <Text style={styles.attendanceNumber}>
          {presentCount}/{employees.length}
        </Text>
      </View>

      <Pressable
        style={styles.secondaryButton}
        onPress={() => setScreen('Attendance')}
      >
        <Text style={styles.secondaryButtonText}>Manage Attendance →</Text>
      </Pressable>

      <Text style={styles.sectionTitle}>Recent Leads</Text>
      {leads.slice(0, 3).map(lead => (
        <LeadCard key={lead.id} lead={lead} />
      ))}

      <Pressable
        style={styles.primaryButton}
        onPress={() => setScreen('Leads')}
      >
        <Text style={styles.primaryButtonText}>View All Leads →</Text>
      </Pressable>

      <Text style={styles.sectionTitle}>Recent Activities</Text>
      {activities.slice(0, 3).map(activity => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}
    </>
  );

  // LEADS
  const renderLeads = () => (
    <>
      <Text style={styles.sectionTitle}>Manage Leads</Text>

      <TextInput
        style={styles.input}
        placeholder="Search leads..."
        value={search}
        onChangeText={setSearch}
      />

      <View style={styles.formCard}>
        <Text style={styles.formTitle}>Add New Lead</Text>

        <TextInput
          style={styles.input}
          placeholder="Customer name"
          value={newName}
          onChangeText={setNewName}
        />

        <TextInput
          style={styles.input}
          placeholder="Company name"
          value={newCompany}
          onChangeText={setNewCompany}
        />

        <Pressable style={styles.primaryButton} onPress={addLead}>
          <Text style={styles.primaryButtonText}>+ Add Lead</Text>
        </Pressable>
      </View>

      {filteredLeads.map(lead => (
        <LeadCard key={lead.id} lead={lead} />
      ))}

      {filteredLeads.length === 0 && (
        <Text style={styles.emptyText}>No leads found.</Text>
      )}
    </>
  );

  // CLIENTS
  const renderClients = () => {
    const clients = leads.filter(item => item.status === 'Converted');

    return (
      <>
        <Text style={styles.sectionTitle}>My Clients</Text>
        {clients.length === 0 ? (
          <Text style={styles.emptyText}>No converted clients yet.</Text>
        ) : (
          clients.map(client => (
            <LeadCard key={client.id} lead={client} />
          ))
        )}
      </>
    );
  };

  // EMPLOYEE MANAGEMENT
  const renderEmployees = () => (
    <>
      <Text style={styles.sectionTitle}>Employee Management</Text>

      <View style={styles.statsGrid}>
        <StatCard title="Total Employees" value={employees.length} color="#2563EB" />
        <StatCard title="Present Today" value={presentCount} color="#16A34A" />
      </View>

      {employees.map(employee => (
        <View key={employee.id} style={styles.leadCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {employee.name.charAt(0)}
            </Text>
          </View>

          <View style={styles.leadInfo}>
            <Text style={styles.leadName}>{employee.name}</Text>
            <Text style={styles.company}>{employee.department}</Text>
            <Text style={styles.company}>Check-in: {employee.checkIn}</Text>
          </View>

          <View style={[
            styles.status,
            employee.present ? styles.green : styles.orange
          ]}>
            <Text style={styles.statusText}>
              {employee.present ? 'Present' : 'Absent'}
            </Text>
          </View>
        </View>
      ))}
    </>
  );

  // ATTENDANCE
  const renderAttendance = () => (
    <>
      <Text style={styles.sectionTitle}>Attendance Management</Text>

      <View style={styles.revenueCard}>
        <Text style={styles.revenueLabel}>Today's Attendance</Text>
        <Text style={styles.revenueValue}>
          {presentCount}/{employees.length}
        </Text>
        <Text style={styles.revenueNote}>
          {employees.length
            ? `${Math.round((presentCount / employees.length) * 100)}% employees present`
            : 'No employees added'}
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Employee Check-in</Text>

      {employees.map(employee => (
        <View key={employee.id} style={styles.leadCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {employee.name.charAt(0)}
            </Text>
          </View>

          <View style={styles.leadInfo}>
            <Text style={styles.leadName}>{employee.name}</Text>
            <Text style={styles.company}>{employee.department}</Text>
            <Text style={styles.company}>
              {employee.present
                ? `Checked in: ${employee.checkIn}`
                : 'Not checked in'}
            </Text>
          </View>

          <Pressable
            onPress={() => toggleAttendance(employee.id)}
            style={[
              styles.attendanceButton,
              employee.present ? styles.checkoutButton : styles.checkinButton
            ]}
          >
            <Text style={styles.attendanceButtonText}>
              {employee.present ? 'Check Out' : 'Check In'}
            </Text>
          </Pressable>
        </View>
      ))}
    </>
  );

  // ACTIVITIES
  const renderActivities = () => (
    <>
      <Text style={styles.sectionTitle}>Activity Timeline</Text>
      <Text style={styles.company}>Latest business updates</Text>

      {activities.map(activity => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}
    </>
  );

  // TASKS
  const renderTasks = () => (
    <>
      <Text style={styles.sectionTitle}>Today's Tasks</Text>

      {tasks.map(task => (
        <Pressable
          key={task.id}
          style={styles.taskCard}
          onPress={() => toggleTask(task.id)}
        >
          <View style={[
            styles.checkCircle,
            task.done && styles.checked
          ]}>
            <Text style={styles.checkText}>
              {task.done ? '✓' : ''}
            </Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={[
              styles.taskTitle,
              task.done && styles.completed
            ]}>
              {task.title}
            </Text>
            <Text style={styles.company}>{task.time}</Text>
          </View>

          <Text style={styles.taskStatus}>
            {task.done ? 'Done' : 'Pending'}
          </Text>
        </Pressable>
      ))}
    </>
  );

  // PROFILE
  const renderProfile = () => (
    <View style={styles.profileCard}>
      <View style={styles.bigAvatar}>
        <Text style={styles.bigAvatarText}>V</Text>
      </View>

      <Text style={styles.profileName}>Vishwajit</Text>
      <Text style={styles.company}>CRM Administrator</Text>

      <View style={styles.profileDetails}>
        <Text style={styles.detail}>Email: admin@example.com</Text>
        <Text style={styles.detail}>Role: Administrator</Text>
        <Text style={styles.detail}>App: ClientFlow CRM</Text>
      </View>
    </View>
  );

  const screens = [
    { name: 'Dashboard', icon: '⌂' },
    { name: 'Leads', icon: '♙' },
    { name: 'Clients', icon: '♧' },
    { name: 'Employees', icon: '♟' },
    { name: 'Attendance', icon: '✓' },
    { name: 'Activities', icon: '◷' },
    { name: 'Tasks', icon: '☑' },
    { name: 'Profile', icon: '◉' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F7FB" />

      <View style={styles.header}>
        <View>
          <Text style={styles.logo}>ClientFlow.</Text>
          <Text style={styles.subtitle}>Business Management</Text>
        </View>

        <View style={styles.headerAvatar}>
          <Text style={styles.headerAvatarText}>V</Text>
        </View>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.welcome}>Hello, Vishwajit 👋</Text>
        <Text style={styles.welcomeSub}>
          Here's your business overview.
        </Text>

        {screen === 'Dashboard' && renderDashboard()}
        {screen === 'Leads' && renderLeads()}
        {screen === 'Clients' && renderClients()}
        {screen === 'Employees' && renderEmployees()}
        {screen === 'Attendance' && renderAttendance()}
        {screen === 'Activities' && renderActivities()}
        {screen === 'Tasks' && renderTasks()}
        {screen === 'Profile' && renderProfile()}
      </ScrollView>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.bottomNav}
        contentContainerStyle={styles.navContent}
      >
        {screens.map(item => (
          <Pressable
            key={item.name}
            style={styles.navItem}
            onPress={() => {
              setScreen(item.name);
              setSearch('');
            }}
          >
            <Text style={[
              styles.navIcon,
              screen === item.name && styles.activeNav
            ]}>
              {item.icon}
            </Text>

            <Text style={[
              styles.navText,
              screen === item.name && styles.activeNav
            ]}>
              {item.name}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

// STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1D4ED8',
  },
  subtitle: {
    color: '#64748B',
    fontSize: 12,
    marginTop: 3,
  },
  headerAvatar: {
    width: 42,
    height: 42,
    borderRadius: 25,
    backgroundColor: '#DBEAFE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerAvatarText: {
    color: '#1D4ED8',
    fontWeight: 'bold',
    fontSize: 18,
  },
  content: {
    flex: 1,
    paddingHorizontal: 18,
  },
  welcome: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#0F172A',
    marginTop: 5,
  },
  welcomeSub: {
    color: '#64748B',
    marginTop: 5,
    marginBottom: 22,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#0F172A',
    marginTop: 15,
    marginBottom: 14,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    padding: 17,
    borderRadius: 14,
    marginBottom: 12,
  },
  statTitle: {
    color: '#64748B',
    fontSize: 13,
  },
  statValue: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 8,
  },
  revenueCard: {
    backgroundColor: '#1D4ED8',
    padding: 22,
    borderRadius: 16,
    marginTop: 10,
  },
  revenueLabel: {
    color: '#DBEAFE',
    fontSize: 14,
  },
  revenueValue: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 8,
  },
  revenueNote: {
    color: '#DBEAFE',
    marginTop: 5,
  },
  attendanceSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 13,
    marginTop: 15,
  },
  attendanceNumber: {
    color: '#16A34A',
    fontSize: 23,
    fontWeight: 'bold',
  },
  leadCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 13,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 25,
    backgroundColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#1D4ED8',
    fontWeight: 'bold',
    fontSize: 18,
  },
  leadInfo: {
    flex: 1,
    marginLeft: 12,
  },
  leadName: {
    fontWeight: 'bold',
    color: '#0F172A',
    fontSize: 14,
  },
  company: {
    color: '#64748B',
    fontSize: 12,
    marginTop: 4,
  },
  amount: {
    color: '#334155',
    fontSize: 12,
    marginTop: 4,
    fontWeight: '600',
  },
  status: {
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 15,
  },
  blue: {
    backgroundColor: '#DBEAFE',
  },
  green: {
    backgroundColor: '#DCFCE7',
  },
  orange: {
    backgroundColor: '#FFEDD5',
  },
  statusText: {
    fontSize: 10,
    color: '#334155',
    fontWeight: 'bold',
  },
  primaryButton: {
    backgroundColor: '#2563EB',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 12,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#DBEAFE',
    padding: 13,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  secondaryButtonText: {
    color: '#1D4ED8',
    fontWeight: 'bold',
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 15,
    marginBottom: 15,
  },
  formTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#0F172A',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 9,
    padding: 13,
    marginBottom: 10,
    color: '#0F172A',
  },
  emptyText: {
    textAlign: 'center',
    color: '#64748B',
    marginTop: 25,
  },
  taskCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checkCircle: {
    width: 25,
    height: 25,
    borderWidth: 2,
    borderColor: '#2563EB',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: {
    backgroundColor: '#16A34A',
    borderColor: '#16A34A',
  },
  checkText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  taskTitle: {
    fontWeight: '600',
    color: '#0F172A',
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#94A3B8',
  },
  taskStatus: {
    fontSize: 11,
    color: '#2563EB',
  },
  activityCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginTop: 10,
    gap: 12,
  },
  activityDot: {
    width: 11,
    height: 11,
    borderRadius: 10,
    backgroundColor: '#2563EB',
    marginTop: 4,
  },
  activityTime: {
    color: '#94A3B8',
    fontSize: 11,
    marginTop: 5,
  },
  attendanceButton: {
    paddingHorizontal: 10,
    paddingVertical: 9,
    borderRadius: 8,
  },
  checkinButton: {
    backgroundColor: '#DCFCE7',
  },
  checkoutButton: {
    backgroundColor: '#FFEDD5',
  },
  attendanceButtonText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#334155',
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    padding: 25,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  bigAvatar: {
    width: 90,
    height: 90,
    borderRadius: 50,
    backgroundColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigAvatarText: {
    color: '#1D4ED8',
    fontSize: 35,
    fontWeight: 'bold',
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 12,
    color: '#0F172A',
  },
  profileDetails: {
    width: '100%',
    marginTop: 25,
    gap: 15,
  },
  detail: {
    color: '#475569',
    fontSize: 14,
  },
  bottomNav: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderColor: '#E2E8F0',
    maxHeight: 65,
  },
  navContent: {
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 82,
    paddingVertical: 8,
  },
  navIcon: {
    fontSize: 20,
    color: '#94A3B8',
  },
  navText: {
    fontSize: 10,
    color: '#94A3B8',
    marginTop: 4,
  },
  activeNav: {
    color: '#2563EB',
    fontWeight: 'bold',
  },
});
