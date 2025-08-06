import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Check } from 'lucide-react-native';

interface Task {
  id: number;
  title: string;
  completed: boolean;
  priority?: string;
  category?: string;
}

interface TaskItemProps {
  task: Task;
  onToggle: () => void;
  showCategory?: boolean;
}

export default function TaskItem({ task, onToggle, showCategory = false }: TaskItemProps) {
  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high': return '#EF4444';
      case 'medium': return '#F59E0B';
      case 'low': return '#10B981';
      default: return '#6B7280';
    }
  };

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'work': return '#3B82F6';
      case 'personal': return '#8B5CF6';
      case 'health': return '#10B981';
      case 'shopping': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onToggle} activeOpacity={0.7}>
      <View style={styles.checkbox}>
        {task.completed ? (
          <View style={styles.checkedBox}>
            <Check size={16} color="#FFFFFF" strokeWidth={3} />
          </View>
        ) : (
          <View style={styles.uncheckedBox} />
        )}
      </View>
      
      <View style={styles.content}>
        <Text style={[styles.title, task.completed && styles.completedTitle]}>
          {task.title}
        </Text>
        
        {showCategory && (task.priority || task.category) && (
          <View style={styles.tags}>
            {task.priority && (
              <View style={[styles.tag, { backgroundColor: getPriorityColor(task.priority) }]}>
                <Text style={styles.tagText}>{task.priority}</Text>
              </View>
            )}
            {task.category && (
              <View style={[styles.tag, { backgroundColor: getCategoryColor(task.category) }]}>
                <Text style={styles.tagText}>{task.category}</Text>
              </View>
            )}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  checkbox: {
    marginRight: 12,
    marginTop: 2,
  },
  checkedBox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    backgroundColor: '#14B8A6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uncheckedBox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#D1D5DB',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
    lineHeight: 24,
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: '#9CA3AF',
  },
  tags: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 8,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  tagText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
  },
});