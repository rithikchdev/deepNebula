import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Heading, Text, VStack, SimpleGrid, Card, Button, HStack } from '@chakra-ui/react';
import { Shield, FileSearch, LineChart, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Deepfake Detection',
    desc: 'Analyze video frames and imagery for facial artifacts and boundary synthesis.',
  },
  {
    icon: FileSearch,
    title: 'AI Generated Media',
    desc: 'Pinpoint subtle generative markings, diffusion noise, and textural anomalies.',
  },
  {
    icon: LineChart,
    title: 'Forensics Insights',
    desc: 'Examine detailed breakdowns comparing local model inference with Gemini multimodal scans.',
  },
];

export default function Home() {
  return (
    <Box maxW="5xl" mx="auto" py={6}>
      {/* Hero Section */}
      <VStack gap={4} textAlign="center" py={12}>
        <Heading size="3xl" color="white" fontWeight="extrabold">
          Deepfake Images Detection
        </Heading>
        <Text color="gray.400" fontSize="lg" maxW="2xl">
          DeepNebula identifies synthetic artifacts.
        </Text>
        <RouterLink to="/detector">
          <Button colorPalette="blue" size="lg" mt={4}>
            <HStack gap={2}>
              <Text>Launch Detector</Text>
              <ArrowRight size={18} />
            </HStack>
          </Button>
        </RouterLink>
      </VStack>

      {/* Features Grid */}
      <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} mt={6}>
        {features.map((feature, idx) => (
          <Card.Root key={idx} bg="#0f172a" borderWidth="1px" borderColor="gray.800" borderRadius="xl">
            <Card.Body p={6}>
              <VStack align="flex-start" gap={3}>
                <Box p={3} bg="blue.950" borderRadius="lg" color="blue.400">
                  <feature.icon size={24} />
                </Box>
                <Heading size="sm" color="white">{feature.title}</Heading>
                <Text fontSize="sm" color="gray.400" lineHeight="tall">{feature.desc}</Text>
              </VStack>
            </Card.Body>
          </Card.Root>
        ))}
      </SimpleGrid>
    </Box>
  );
}