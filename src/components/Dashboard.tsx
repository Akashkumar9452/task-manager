import React, { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
  Tab,
  Tabs,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { TaskForm } from './TaskForm';
import { TaskList } from './TaskList';
import { useTaskContext } from '../context/TaskContext';
import { Task, TaskFormData } from '../types/Task';
import { isAfter, isBefore, startOfDay } from 'date-fns';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => (
  <div
    hidden={value !== index}
    style={{
      marginTop: '1.5rem',
      minHeight: '300px',
    }}
  >
    {value === index && children}
  </div>
);

export const Dashboard: React.FC = () => {
  const { tasks, addTask, updateTask, deleteTask, toggleTaskCompletion } = useTaskContext();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>();
  const [activeTab, setActiveTab] = useState(0);

  const today = startOfDay(new Date());

  const upcomingTasks = tasks.filter(
    (task) => !task.completed && isAfter(task.dueDate, today)
  );

  const overdueTasks = tasks.filter(
    (task) => !task.completed && isBefore(task.dueDate, today)
  );

  const completedTasks = tasks.filter((task) => task.completed);

  const handleAddClick = () => {
    setSelectedTask(undefined);
    setIsFormOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (taskData: TaskFormData) => {
    if (selectedTask) {
      updateTask(selectedTask.id, taskData);
    } else {
      addTask(taskData);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        py: { xs: 4, md: 6 },
        px: { xs: 2, sm: 3 },
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontSize: { xs: '1.75rem', sm: '2.125rem' },
              fontWeight: 600,
            }}
          >
            Task Manager
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddClick}
            sx={{
              px: 3,
              py: 1,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1rem',
            }}
          >
            Add Task
          </Button>
        </Box>

        <Paper
          elevation={0}
          sx={{
            overflow: 'hidden',
            borderRadius: 3,
          }}
        >
          <Tabs
            value={activeTab}
            onChange={(_, newValue) => setActiveTab(newValue)}
            variant="fullWidth"
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              '& .MuiTab-root': {
                py: 2,
              },
            }}
          >
            <Tab
              label={`Upcoming (${upcomingTasks.length})`}
              sx={{ fontWeight: 500 }}
            />
            <Tab
              label={`Overdue (${overdueTasks.length})`}
              sx={{ fontWeight: 500 }}
            />
            <Tab
              label={`Completed (${completedTasks.length})`}
              sx={{ fontWeight: 500 }}
            />
          </Tabs>

          <Box sx={{ p: { xs: 2, sm: 3 } }}>
            <TabPanel value={activeTab} index={0}>
              <TaskList
                tasks={upcomingTasks}
                onEdit={handleEditTask}
                onDelete={deleteTask}
                onToggleComplete={toggleTaskCompletion}
              />
            </TabPanel>

            <TabPanel value={activeTab} index={1}>
              <TaskList
                tasks={overdueTasks}
                onEdit={handleEditTask}
                onDelete={deleteTask}
                onToggleComplete={toggleTaskCompletion}
              />
            </TabPanel>

            <TabPanel value={activeTab} index={2}>
              <TaskList
                tasks={completedTasks}
                onEdit={handleEditTask}
                onDelete={deleteTask}
                onToggleComplete={toggleTaskCompletion}
              />
            </TabPanel>
          </Box>
        </Paper>
      </Container>

      <TaskForm
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={selectedTask}
      />
    </Box>
  );
}; 