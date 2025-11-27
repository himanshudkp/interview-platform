export const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Interview Platform API',
    version: '1.0.0',
    description: 'API documentation for the Interview Platform',
    contact: {
      name: 'API Support',
      email: 'support@interviewplatform.com',
    },
  },
  servers: [
    {
      url:
        process.env.NODE_ENV === 'production'
          ? 'https://api.interviewplatform.com'
          : 'http://localhost:5000',
      description:
        process.env.NODE_ENV === 'production' ? 'Production server' : 'Development server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          email: { type: 'string', format: 'email' },
          firstName: { type: 'string' },
          lastName: { type: 'string' },
          role: { type: 'string', enum: ['interviewer', 'candidate'] },
          avatar: { type: 'string', nullable: true },
          bio: { type: 'string', nullable: true },
          skills: { type: 'array', items: { type: 'string' } },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      Session: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          title: { type: 'string' },
          interviewerId: { type: 'string' },
          candidateId: { type: 'string' },
          scheduledAt: { type: 'string', format: 'date-time' },
          duration: { type: 'number' },
          status: {
            type: 'string',
            enum: ['scheduled', 'in_progress', 'completed', 'cancelled'],
          },
          videoRoomId: { type: 'string', nullable: true },
          chatChannelId: { type: 'string', nullable: true },
          whiteboardRoomId: { type: 'string', nullable: true },
          codeEditorRoomId: { type: 'string', nullable: true },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      CodeExecution: {
        type: 'object',
        properties: {
          language: { type: 'string' },
          code: { type: 'string' },
          stdin: { type: 'string', nullable: true },
          expectedOutput: { type: 'string', nullable: true },
        },
        required: ['language', 'code'],
      },
      CodeExecutionResult: {
        type: 'object',
        properties: {
          stdout: { type: 'string', nullable: true },
          stderr: { type: 'string', nullable: true },
          compile_output: { type: 'string', nullable: true },
          status: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              description: { type: 'string' },
            },
          },
          time: { type: 'string', nullable: true },
          memory: { type: 'number', nullable: true },
        },
      },
      Scoring: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          sessionId: { type: 'string' },
          technicalSkills: { type: 'number', minimum: 0, maximum: 10 },
          problemSolving: { type: 'number', minimum: 0, maximum: 10 },
          communication: { type: 'number', minimum: 0, maximum: 10 },
          codeQuality: { type: 'number', minimum: 0, maximum: 10 },
          notes: { type: 'string', nullable: true },
          recommendation: {
            type: 'string',
            enum: ['strong_hire', 'hire', 'no_hire', 'strong_no_hire'],
          },
          createdAt: { type: 'string', format: 'date-time' },
        },
      },
      Error: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: false },
          error: { type: 'string' },
        },
      },
    },
  },
  security: [{ bearerAuth: [] }],
};

export const swaggerOptions = {
  swaggerDefinition,
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'],
};
