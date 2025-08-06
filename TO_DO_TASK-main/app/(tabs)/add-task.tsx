import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { ChevronDown } from 'lucide-react-native';

export default function AddTaskScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [category, setCategory] = useState('work');
  const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const priorities = [
    { value: 'low', label: 'Low Priority', color: '#10B981' },
    { value: 'medium', label: 'Medium Priority', color: '#F59E0B' },
    { value: 'high', label: 'High Priority', color: '#EF4444' },
  ];

  const categories = [
    { value: 'work', label: 'Work', color: '#3B82F6' },
    { value: 'personal', label: 'Personal', color: '#8B5CF6' },
    { value: 'health', label: 'Health', color: '#10B981' },
    { value: 'shopping', label: 'Shopping', color: '#F59E0B' },
  ];

  const handleCreateTask = () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a task title');
      return;
    }

    // In a real app, this would save to database
    Alert.alert('Success', 'Task created successfully!', [
      { text: 'OK', onPress: () => router.push('/(tabs)/tasks') }
    ]);
  };

  const getPriorityInfo = () => priorities.find(p => p.value === priority);
  const getCategoryInfo = () => categories.find(c => c.value === category);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Create New Task</Text>
          <Text style={styles.subtitle}>Add a new task to your todo list</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Task Title</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="Enter task title..."
              placeholderTextColor="#9CA3AF"
              multiline
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Description (Optional)</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              placeholder="Add task description..."
              placeholderTextColor="#9CA3AF"
              multiline
              numberOfLines={4}
            />
          </View>

          <View style={styles.row}>
            <View style={styles.halfWidth}>
              <Text style={styles.label}>Priority</Text>
              <TouchableOpacity
                style={styles.dropdown}
                onPress={() => setShowPriorityDropdown(!showPriorityDropdown)}
              >
                <View style={styles.dropdownContent}>
                  <View style={[styles.priorityDot, { backgroundColor: getPriorityInfo()?.color }]} />
                  <Text style={styles.dropdownText}>{getPriorityInfo()?.label}</Text>
                </View>
                <ChevronDown size={20} color="#6B7280" strokeWidth={2} />
              </TouchableOpacity>
              {showPriorityDropdown && (
                <View style={styles.dropdownOptions}>
                  {priorities.map(p => (
                    <TouchableOpacity
                      key={p.value}
                      style={styles.dropdownOption}
                      onPress={() => {
                        setPriority(p.value);
                        setShowPriorityDropdown(false);
                      }}
                    >
                      <View style={[styles.priorityDot, { backgroundColor: p.color }]} />
                      <Text style={styles.optionText}>{p.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            <View style={styles.halfWidth}>
              <Text style={styles.label}>Category</Text>
              <TouchableOpacity
                style={styles.dropdown}
                onPress={() => setShowCategoryDropdown(!showCategoryDropdown)}
              >
                <View style={styles.dropdownContent}>
                  <View style={[styles.categoryDot, { backgroundColor: getCategoryInfo()?.color }]} />
                  <Text style={styles.dropdownText}>{getCategoryInfo()?.label}</Text>
                </View>
                <ChevronDown size={20} color="#6B7280" strokeWidth={2} />
              </TouchableOpacity>
              {showCategoryDropdown && (
                <View style={styles.dropdownOptions}>
                  {categories.map(c => (
                    <TouchableOpacity
                      key={c.value}
                      style={styles.dropdownOption}
                      onPress={() => {
                        setCategory(c.value);
                        setShowCategoryDropdown(false);
                      }}
                    >
                      <View style={[styles.categoryDot, { backgroundColor: c.color }]} />
                      <Text style={styles.optionText}>{c.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </View>

          <TouchableOpacity style={styles.createButton} onPress={handleCreateTask}>
            <Text style={styles.createButtonText}>Create Task</Text>
          </TouchableOpacity>
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
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
  },
  form: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    color: '#1F2937',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  halfWidth: {
    flex: 1,
  },
  dropdown: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownText: {
    fontSize: 16,
    color: '#1F2937',
    marginLeft: 8,
  },
  priorityDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  categoryDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  dropdownOptions: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 1000,
    marginTop: 4,
  },
  dropdownOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  optionText: {
    fontSize: 16,
    color: '#1F2937',
    marginLeft: 8,
  },
  createButton: {
    backgroundColor: '#14B8A6',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 32,
    shadowColor: '#14B8A6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});