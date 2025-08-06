import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Clock } from 'lucide-react-native';
import TaskItem from '@/components/TaskItem';
import UserProfile from '@/components/UserProfile';

export default function HomeScreen() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Make Coffee request by 11am', completed: false, priority: 'high' },
    { id: 2, title: 'Attend team standup by 10:1', completed: true, priority: 'medium' },
    { id: 3, title: 'Review client proposal', completed: false, priority: 'low' },
    { id: 4, title: 'Call pharmacy by 5pm', completed: false, priority: 'high' },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleTaskToggle = (taskId: number) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <UserProfile />
        
        <View style={styles.clockContainer}>
          <View style={styles.clockCard}>
            <Clock size={40} color="#14B8A6" strokeWidth={2} />
            <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
            <Text style={styles.dateText}>
              {currentTime.toLocaleDateString([], { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
              })}
            </Text>
          </View>
        </View>

        <View style={styles.taskSection}>
          <View style={styles.taskHeader}>
            <Text style={styles.taskTitle}>Today's To-Do List</Text>
            <View style={styles.progressContainer}>
              <Text style={styles.progressText}>
                {completedCount}/{totalCount} completed
              </Text>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { width: `${(completedCount / totalCount) * 100}%` }
                  ]} 
                />
              </View>
            </View>
          </View>

          <View style={styles.tasksList}>
            <Text style={styles.sectionTitle}>Daily Tasks</Text>
            {tasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={() => handleTaskToggle(task.id)}
              />
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 100,
  },
  clockContainer: {
    marginVertical: 24,
    alignItems: 'center',
  },
  clockCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    width: 180,
  },
  timeText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginTop: 12,
  },
  dateText: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  taskSection: {
    marginTop: 8,
  },
  taskHeader: {
    marginBottom: 20,
  },
  taskTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    marginLeft: 12,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#14B8A6',
    borderRadius: 3,
  },
  tasksList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
});