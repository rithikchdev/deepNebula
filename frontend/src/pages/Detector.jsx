import React, { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  Image,
  Badge,
  SimpleGrid,
  Card,
  Alert,
  Code,
  Separator,
  Progress,
  Spinner,
} from '@chakra-ui/react';
import {
  UploadCloud,
  ShieldCheck,
  ShieldAlert,
  Cpu,
  Search,
  XCircle,
} from 'lucide-react';

export default function Detector() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
      setResults(null);
      setError(null);
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('http://localhost:5000/api/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server returned error: ${response.statusText}`);
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err.message || 'Inspection failed');
    } finally {
      setLoading(false);
    }
  };

  const gemini = results?.geminiResult;
  const custom = results?.customModelResult;

  return (
    <Box maxW="5xl" mx="auto">
      <VStack gap={2} textAlign="left" mb={8} align="stretch">
        <Heading size="xl" color="white">
          Media Analysis Console
        </Heading>
        <Text color="gray.400" fontSize="sm">
          Upload an image to execute custom backend analysis and multimodal Gemini forensics.
        </Text>
      </VStack>

      <VStack gap={6} align="stretch">
        {/* Upload Zone */}
        <Box
          borderWidth="2px"
          borderStyle="dashed"
          borderColor="gray.700"
          borderRadius="xl"
          bg="#0f172a"
          p={8}
          textAlign="center"
          position="relative"
          transition="all 0.2s"
          _hover={{ borderColor: 'blue.500', bg: '#131e36' }}
        >
          <input
            type="file"
            accept="image/*"
            id="file-upload"
            onChange={handleFileChange}
            style={{
              opacity: 0,
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              cursor: 'pointer',
            }}
          />
          <VStack gap={2}>
            <UploadCloud size={44} color="#60a5fa" />
            <Text fontWeight="medium" color="gray.100">
              Click or drag image to evaluate
            </Text>
            <Text fontSize="xs" color="gray.500">
              PNG, JPG, WEBP formats supported
            </Text>
          </VStack>
        </Box>

        {/* Selected Image Preview & Trigger */}
        {preview && (
          <VStack gap={4} align="center">
            <Box
              borderRadius="lg"
              overflow="hidden"
              borderWidth="1px"
              borderColor="gray.800"
              maxW="400px"
              w="100%"
            >
              <Image
                src={preview}
                alt="Upload preview"
                objectFit="contain"
                maxH="300px"
                w="100%"
              />
            </Box>

            <Button
              colorPalette="blue"
              size="lg"
              px={8}
              disabled={loading}
              onClick={handleAnalyze}
            >
              {loading ? (
                <HStack gap={2}>
                  <Spinner size="sm" />
                  <Text>Running Pipeline...</Text>
                </HStack>
              ) : (
                <HStack gap={2}>
                  <Search size={18} />
                  <Text>Inspect Image</Text>
                </HStack>
              )}
            </Button>
          </VStack>
        )}

        {/* Error Alert */}
        {error && (
          <Alert.Root status="error" variant="subtle" borderRadius="md">
            <Alert.Indicator />
            <Alert.Title>Scan Failed</Alert.Title>
            <Alert.Description>{error}</Alert.Description>
          </Alert.Root>
        )}

        {/* Dual Inspection Results */}
        {results && (
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={6} mt={2}>
            {/* Gemini Forensic Card */}
            <Card.Root
              bg="#0f172a"
              borderWidth="1px"
              borderColor={gemini?.isDeepfake ? 'red.600' : 'green.600'}
              borderRadius="lg"
            >
              <Card.Header pb={2}>
                <HStack justify="space-between">
                  <HStack gap={2}>
                    {gemini?.isDeepfake ? (
                      <ShieldAlert size={20} color="#f87171" />
                    ) : (
                      <ShieldCheck size={20} color="#4ade80" />
                    )}
                    <Card.Title color="white" fontSize="md">
                      Gemini Forensic Engine
                    </Card.Title>
                  </HStack>
                  <Badge
                    colorPalette={gemini?.isDeepfake ? 'red' : 'green'}
                    variant="solid"
                  >
                    {gemini?.verdict || 'Processed'}
                  </Badge>
                </HStack>
              </Card.Header>

              <Separator borderColor="gray.800" />

              <Card.Body>
                <VStack align="stretch" gap={4}>
                  <Box>
                    <HStack justify="space-between" mb={1}>
                      <Text fontSize="xs" color="gray.400">
                        Confidence
                      </Text>
                      <Text fontSize="xs" fontWeight="bold" color="white">
                        {gemini?.confidenceScore || 0}%
                      </Text>
                    </HStack>
                    <Progress.Root
                      value={gemini?.confidenceScore || 0}
                      colorPalette={gemini?.isDeepfake ? 'red' : 'green'}
                      size="sm"
                    >
                      <Progress.Track bg="gray.800">
                        <Progress.Range />
                      </Progress.Track>
                    </Progress.Root>
                  </Box>

                  <Box>
                    <Text fontSize="xs" color="gray.400" mb={1} textTransform="uppercase">
                      Technical Assessment
                    </Text>
                    <Text fontSize="sm" color="gray.300" lineHeight="tall">
                      {gemini?.explanation || 'No evaluation notes available.'}
                    </Text>
                  </Box>

                  {gemini?.anomaliesDetected?.length > 0 && (
                    <Box>
                      <Text fontSize="xs" color="gray.400" mb={2} textTransform="uppercase">
                        Identified Artifacts
                      </Text>
                      <VStack align="stretch" gap={1}>
                        {gemini.anomaliesDetected.map((item, idx) => (
                          <HStack key={idx} gap={2} fontSize="xs" color="red.300">
                            <XCircle size={14} color="#f87171" />
                            <Text>{item}</Text>
                          </HStack>
                        ))}
                      </VStack>
                    </Box>
                  )}
                </VStack>
              </Card.Body>
            </Card.Root>

            {/* Custom Model Output Card */}
            <Card.Root bg="#0f172a" borderWidth="1px" borderColor="gray.800" borderRadius="lg">
              <Card.Header pb={2}>
                <HStack justify="space-between">
                  <HStack gap={2}>
                    <Cpu size={20} color="#38bdf8" />
                    <Card.Title color="white" fontSize="md">
                      Custom Python Model
                    </Card.Title>
                  </HStack>
                  <Badge colorPalette="cyan" variant="subtle">
                    {custom?.status || 'Active'}
                  </Badge>
                </HStack>
              </Card.Header>

              <Separator borderColor="gray.800" />

              <Card.Body>
                <VStack align="stretch" gap={3}>
                  <HStack justify="space-between">
                    <Text fontSize="xs" color="gray.400">
                      Prediction:
                    </Text>
                    <Text fontSize="xs" fontWeight="semibold" color="yellow.400">
                      {custom?.custom_model_prediction || 'Pending Weights'}
                    </Text>
                  </HStack>

                  <HStack justify="space-between">
                    <Text fontSize="xs" color="gray.400">
                      Local Confidence:
                    </Text>
                    <Text fontSize="xs" fontWeight="semibold" color="white">
                      {custom?.confidence !== undefined ? `${custom.confidence}%` : 'N/A'}
                    </Text>
                  </HStack>

                  <Box mt={2}>
                    <Text fontSize="xs" color="gray.400" mb={1}>
                      Raw Model Stdout
                    </Text>
                    <Code
                      display="block"
                      p={3}
                      borderRadius="md"
                      fontSize="xs"
                      bg="black"
                      color="green.400"
                      overflowX="auto"
                    >
                      {JSON.stringify(custom, null, 2)}
                    </Code>
                  </Box>
                </VStack>
              </Card.Body>
            </Card.Root>
          </SimpleGrid>
        )}
      </VStack>
    </Box>
  );
}