import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
  Typography,
  Paper,
  Chip,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
} from '@mui/icons-material';
import { format } from 'date-fns';
import { Task, Priority } from '../types/Task';

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onEdit,
  onDelete,
  onToggleComplete,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState<Priority | 'ALL'>('ALL');
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'COMPLETED' | 'ACTIVE'>('ALL');

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case Priority.HIGH:
        return 'error';
      case Priority.MEDIUM:
        return 'warning';
      case Priority.LOW:
        return 'success';
    }
  };

  const getPriorityGradient = (priority: Priority) => {
    switch (priority) {
      case Priority.HIGH:
        return 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
      case Priority.MEDIUM:
        return 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)';
      case Priority.LOW:
        return 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
    }
  };

  const filteredTasks = tasks
    .filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((task) => filterPriority === 'ALL' || task.priority === filterPriority)
    .filter((task) => {
      if (filterStatus === 'ALL') return true;
      return filterStatus === 'COMPLETED' ? task.completed : !task.completed;
    });

  return (
    <Box>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3 }}>
        <TextField
          label="Search tasks"
          variant="outlined"
          size="small"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            flex: 2,
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(8px)',
              borderRadius: '12px',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              },
              '&.Mui-focused': {
                backgroundColor: '#ffffff',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.12)',
              },
            },
          }}
        />
        <FormControl size="small" sx={{ flex: 1, minWidth: 120 }}>
          <InputLabel>Priority</InputLabel>
          <Select
            value={filterPriority}
            label="Priority"
            onChange={(e) => setFilterPriority(e.target.value as Priority | 'ALL')}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(8px)',
              borderRadius: '12px',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              },
              '&.Mui-focused': {
                backgroundColor: '#ffffff',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.12)',
              },
            }}
          >
            <MenuItem value="ALL">All Priorities</MenuItem>
            <MenuItem value={Priority.LOW}>Low</MenuItem>
            <MenuItem value={Priority.MEDIUM}>Medium</MenuItem>
            <MenuItem value={Priority.HIGH}>High</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ flex: 1, minWidth: 120 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={filterStatus}
            label="Status"
            onChange={(e) => setFilterStatus(e.target.value as 'ALL' | 'COMPLETED' | 'ACTIVE')}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(8px)',
              borderRadius: '12px',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              },
              '&.Mui-focused': {
                backgroundColor: '#ffffff',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.12)',
              },
            }}
          >
            <MenuItem value="ALL">All Status</MenuItem>
            <MenuItem value="ACTIVE">Active</MenuItem>
            <MenuItem value="COMPLETED">Completed</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <List sx={{ p: 0 }}>
        {filteredTasks.map((task) => (
          <ListItem
            key={task.id}
            sx={{
              mb: 2,
              p: 0,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
              },
            }}
          >
            <Paper
              elevation={0}
              sx={{
                width: '100%',
                p: 3,
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '4px',
                  height: '100%',
                  background: getPriorityGradient(task.priority),
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <Checkbox
                  checked={task.completed}
                  onChange={() => onToggleComplete(task.id)}
                  icon={<RadioButtonUncheckedIcon />}
                  checkedIcon={<CheckCircleIcon />}
                  sx={{
                    mt: '2px',
                    mr: 2,
                    '& .MuiSvgIcon-root': {
                      fontSize: '1.5rem',
                    },
                  }}
                />
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box sx={{ flex: 1, pr: 2 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: '1.1rem',
                          fontWeight: 600,
                          lineHeight: 1.3,
                          textDecoration: task.completed ? 'line-through' : 'none',
                          color: task.completed ? 'text.secondary' : 'text.primary',
                          opacity: task.completed ? 0.7 : 1,
                          mb: 0.5,
                        }}
                      >
                        {task.title}
                      </Typography>
                      {task.description && (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            opacity: task.completed ? 0.7 : 1,
                            mb: 2,
                            lineHeight: 1.5,
                          }}
                        >
                          {task.description}
                        </Typography>
                      )}
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton
                        onClick={() => onEdit(task)}
                        size="small"
                        sx={{
                          color: 'primary.main',
                          backgroundColor: 'rgba(99, 102, 241, 0.1)',
                          '&:hover': {
                            backgroundColor: 'rgba(99, 102, 241, 0.2)',
                          },
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        onClick={() => onDelete(task.id)}
                        size="small"
                        sx={{
                          color: 'error.main',
                          backgroundColor: 'rgba(239, 68, 68, 0.1)',
                          '&:hover': {
                            backgroundColor: 'rgba(239, 68, 68, 0.2)',
                          },
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Chip
                      label={format(task.dueDate, 'MMM d, yyyy')}
                      size="small"
                      variant="outlined"
                      sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(4px)',
                        borderColor: 'rgba(0, 0, 0, 0.12)',
                        height: '24px',
                      }}
                    />
                    <Chip
                      label={task.priority.toLowerCase()}
                      size="small"
                      sx={{
                        background: getPriorityGradient(task.priority),
                        color: 'white',
                        fontWeight: 600,
                        height: '24px',
                      }}
                    />
                  </Stack>
                </Box>
              </Box>
            </Paper>
          </ListItem>
        ))}
        {filteredTasks.length === 0 && (
          <Paper
            sx={{
              p: 4,
              textAlign: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
            }}
          >
            <Typography color="text.secondary">
              No tasks found
            </Typography>
          </Paper>
        )}
      </List>
    </Box>
  );
}; 