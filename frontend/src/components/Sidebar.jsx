import React from 'react';
import { NavLink } from 'react-router-dom';
import { Box, VStack, HStack, Text, Icon } from '@chakra-ui/react';
import { Shield, Sparkles, FileText, BarChart3 } from 'lucide-react';

const navItems = [
  { name: 'Home', path: '/', icon: Sparkles },
  { name: 'Detector', path: '/detector', icon: Shield },
  { name: 'Docs', path: '/docs', icon: FileText },
  { name: 'AI Insights', path: '/ai-insights', icon: BarChart3 },
];

export default function Sidebar() {
  return (
    <Box
      as="nav"
      w="240px"
      h="100vh"
      position="fixed"
      left={0}
      top={0}
      bg="#0c121e"
      borderRight="1px solid"
      borderColor="gray.800"
      p={6}
      display="flex"
      flexDirection="column"
      zIndex={10}
    >
      {/* Brand Header */}
      <HStack gap={3} mb={10}>
        <Shield size={24} color="#3b82f6" />
        <Text fontSize="xl" fontWeight="bold" letterSpacing="wide" color="white">
          DeepNebula
        </Text>
      </HStack>

      {/* Nav Items */}
      <VStack align="stretch" gap={2}>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 14px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500',
              color: isActive ? '#ffffff' : '#9ca3af',
              backgroundColor: isActive ? '#1e293b' : 'transparent',
              borderLeft: isActive ? '3px solid #3b82f6' : '3px solid transparent',
              transition: 'all 0.15s ease',
            })}
          >
            <item.icon size={18} />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </VStack>
    </Box>
  );
}