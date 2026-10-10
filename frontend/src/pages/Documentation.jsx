import React from 'react';
import { Box, Heading, Text, VStack, List, Card } from '@chakra-ui/react';

export default function Documentation() {
  return (
    <Box maxW="4xl" mx="auto">
      <VStack align="stretch" gap={6}>
        <Box>
          <Heading size="xl" color="white" mb={2}>
            Platform Documentation
          </Heading>
          <Text color="gray.400" fontSize="sm">
            Architectural reference for DeepNebula multimodal forensics and model verification.
          </Text>
        </Box>

        <Card.Root bg="#0f172a" borderWidth="1px" borderColor="gray.800" borderRadius="lg" p={6}>
          <Heading size="md" color="white" mb={3}>
            Core Detection Engine
          </Heading>
          <Text color="gray.300" fontSize="sm" lineHeight="tall" mb={4}>
            The system employs a dual-tiered detection pipeline. Incoming media is simultaneously
            evaluated through local low-level feature extraction scripts (e.g., Fourier frequency analysis,
            boundary gradients) and high-level visual comprehension via Gemini models to catch semantic
            and anatomical anomalies.
          </Text>

          <Heading size="sm" color="gray.200" mb={2}>
            Key Components:
          </Heading>
          <List.Root gap={2} ps={4} color="gray.400" fontSize="sm">
            <List.Item>Multi-Frequency Domain Anomaly Verification</List.Item>
            <List.Item>Facial Landmark & Blending Edge Forensics</List.Item>
            <List.Item>Generative Texture and Lighting Discrepancy Scans</List.Item>
            <List.Item>Aggregated JSON Verdict Streaming</List.Item>
          </List.Root>
        </Card.Root>
      </VStack>
    </Box>
  );
}