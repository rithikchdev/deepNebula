import React from 'react';
import { Box, Heading, Text, SimpleGrid, Card, VStack } from '@chakra-ui/react';
import { TrendingUp, AlertTriangle, Cpu } from 'lucide-react';

const insights = [
  {
    icon: TrendingUp,
    title: 'Deepfake Trends',
    desc: 'Rapid shift from single-frame face swapping to real-time temporal diffusion and live stream spoofing.',
  },
  {
    icon: AlertTriangle,
    title: 'Adversarial Attacks',
    desc: 'Injection of targeted noise perturbations intended to bypass traditional CNN-based image classifiers.',
  },
  {
    icon: Cpu,
    title: 'Detection Research',
    desc: 'Integration of attention-based transformer vision backbones capable of highlighting sub-pixel artifact patterns.',
  },
];

export default function AIInsights() {
  return (
    <Box maxW="5xl" mx="auto">
      <Heading size="xl" color="white" mb={2}>
        Artificial Intelligence Insights
      </Heading>
      <Text color="gray.400" fontSize="sm" mb={8}>
        Security advisories, generative threat analysis, and contemporary detection benchmarks.
      </Text>

      <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
        {insights.map((item, idx) => (
          <Card.Root key={idx} bg="#0f172a" borderWidth="1px" borderColor="gray.800" borderRadius="lg">
            <Card.Body p={6}>
              <VStack align="flex-start" gap={3}>
                <Box p={3} bg="blue.950" borderRadius="md" color="blue.400">
                  <item.icon size={22} />
                </Box>
                <Heading size="sm" color="white">{item.title}</Heading>
                <Text fontSize="sm" color="gray.400" lineHeight="tall">{item.desc}</Text>
              </VStack>
            </Card.Body>
          </Card.Root>
        ))}
      </SimpleGrid>
    </Box>
  );
}