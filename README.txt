This applicaiton consists of frontend and backend. How they are deployed in AWS
The attached architecture diagram provides a comprehensive visual representation of the described architecture. Key components and their interactions are labeled and color-coded for clarity. It demonstrates: 

Traffic flow from users through the ALB to the backend and frontend tasks. 

Integration between serverless components (API Gateway, Lambda functions, S3, DynamoDB, and SNS). 

Secure isolation of private and public subnets. 

Administrative access via the Bastion Host. 

This architecture adheres to AWS best practices for security, scalability, and maintainability. 

These sections outline the AWS services utilized in our project, organized into three primary components: Networking, Compute, and Serverless. The architecture is visually represented in the attached diagram, ensuring clarity on the relationships between services and their roles. 

Networking 

The networking setup is structured around a single Virtual Private Cloud (VPC), which is divided into four subnets: 

Two Public Subnets (Public Subnet 1 and 2): Used to deploy resources requiring internet access, such as the Application Load Balancer (ALB) and the Bastion Host (EC2). 

Two Private Subnets (DB Subnet 1 and 2): Reserved for secure resources, including Amazon RDS for PostgreSQL and Amazon ElastiCache for Redis, which do not require direct internet connectivity. 

Key components include: 

Internet Gateway (IGW): Provides internet access to resources in the public subnets. 

Route Tables: Manage the routing of traffic between the subnets and the internet gateway, isolating traffic between public and private subnets. 

Security Groups: 

Load Balancer Security Group: Accepts incoming traffic from users and routes it to the application tasks. 

Frontend/Backend Application Security Group: Allows communication only from the ALB and between backend services as necessary. 

Database Security Group: Permits secure access exclusively from the application tasks. 

Bastion Host Security Group: Grants administrative access for developers to connect to private resources, such as databases or caches, using the Bastion Host. 

The networking setup ensures secure, controlled access for both user traffic and administrative activities, as depicted in the diagram. 

Serverless 

The serverless architecture handles event-driven workflows and backend services using Amazon API Gateway, AWS Lambda, and other serverless resources. API Gateway exposes six key routes, facilitating operations as outlined in the diagram: 

/subscribe: Triggers an AWS Step Functions workflow, which validates user subscriptions to an SNS (Simple Notification Service) Topic. This workflow integrates with a Lambda function for subscription checking and sends confirmation emails via SNS if necessary. 

/send-otp: Invokes a Lambda function to generate and send OTP codes to user emails through SNS. 

/create-event: Processes user-submitted event images via a Lambda function and stores them in an S3 Bucket. 

/create-ticket: Generates and stores event registration QR codes in the S3 bucket, handled by a Lambda function. 

/get-qr-code: Fetches a pre-signed URL for event ticket QR codes stored in the S3 bucket. The pre-signed URL is time-limited for secure access. 

/log-activity: Logs user activities into Amazon DynamoDB for tracking and analytics. 

Additional serverless components: 

S3 Bucket: Stores event images and QR codes securely. The resources are accessed securely using pre-signed URLs. 

IAM Roles and Policies: Ensure minimal required permissions for Lambda functions and other AWS services, adhering to the principle of least privilege. 

The serverless workflow simplifies the architecture and efficiently manages resources, as depicted on the upper right of the diagram. 

Compute 

The compute layer is built around Amazon ECS (Elastic Container Service) for deploying containerized applications. The architecture includes: 

Frontend and Backend Containers: Deployed as ECS tasks, with compute configurations defined in ECS Task Definitions. The container images are stored in Amazon ECR (Elastic Container Registry). 

Task Definitions: Define resource requirements (e.g., CPU, memory) and other configurations for both the frontend and backend tasks. 

Application Load Balancers (ALBs): Two ALBs are deployed: 

One ALB serves as the public-facing endpoint for frontend requests. 

The other ALB manages traffic to the backend services. 

Database Layer: 

Amazon RDS for PostgreSQL: Hosts the relational database, securely placed in private subnets. 

Amazon ElastiCache for Redis: Serves as an in-memory cache to optimize performance. 

Both database services are configured with private security groups and credentials securely stored in AWS Secrets Manager. 

Bastion Host (EC2): A secure administrative instance placed in a public subnet to provide restricted access to private resources for developers. 

The diagram clearly illustrates the compute workflow, showcasing how traffic flows through the ALB to the ECS services and securely communicates with the database layer.  

Finally, the entire infrastructure is provisioned and managed using AWS CloudFormation templates. CloudFormation ensures repeatability and consistency, allowing us to deploy the architecture with a single operation