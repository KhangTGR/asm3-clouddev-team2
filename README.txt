### **Application Architecture and Deployment Overview**

This application consists of frontend and backend services, deployed on AWS infrastructure. The attached architecture diagram provides a detailed and visually organized representation of the architecture. Key components, their interactions, and roles are clearly labeled and color-coded for easy comprehension. 

The diagram highlights:  
1. **Traffic Flow**: User requests are routed through the Application Load Balancer (ALB) to the backend and frontend tasks.  
2. **Serverless Integrations**: Event-driven workflows leveraging API Gateway, Lambda functions, S3, DynamoDB, and SNS.  
3. **Subnet Isolation**: Secure separation of private and public subnets.  
4. **Administrative Access**: Bastion Host facilitates secure developer access to private resources.  

This architecture adheres to AWS best practices for security, scalability, and maintainability. Below is a detailed breakdown of the architecture, categorized into Networking, Serverless, and Compute components.

---

### **Networking**

The networking setup is built around a single **Virtual Private Cloud (VPC)**, divided into **four subnets** for secure and efficient resource management:  
1. **Public Subnets (2)**: Host internet-facing resources such as the ALB and Bastion Host (EC2).  
2. **Private Subnets (2)**: Securely host resources like Amazon RDS for PostgreSQL and Amazon ElastiCache for Redis, isolated from direct internet access.  

**Key Networking Components:**  
- **Internet Gateway (IGW):** Provides internet access to resources in public subnets.  
- **Route Tables:** Direct traffic between subnets and the IGW while isolating private subnet traffic.  
- **Security Groups:**  
  - **Load Balancer Security Group:** Routes user traffic to application tasks.  
  - **Frontend/Backend Security Groups:** Restrict access to ALB traffic and inter-service communication.  
  - **Database Security Group:** Allows secure access exclusively from application tasks.  
  - **Bastion Host Security Group:** Facilitates secure administrative access to private resources like databases and caches.  

This robust networking design ensures secure, controlled access for both user-facing traffic and administrative activities, as depicted in the diagram.

---

### **Serverless Components**

The serverless architecture simplifies event-driven workflows and backend service management, leveraging a combination of AWS API Gateway, Lambda, S3, DynamoDB, and SNS.  

**Key API Gateway Routes and Workflows:**  
1. **`/subscribe`**: Initiates a Step Functions workflow to validate user subscriptions to an SNS topic. Confirmation emails are sent via SNS when validated.  
2. **`/send-otp`**: Invokes a Lambda function to generate and send OTP codes to user emails through SNS.  
3. **`/create-event`**: Processes event images uploaded by users via Lambda, storing them securely in an S3 bucket.  
4. **`/create-ticket`**: Generates QR codes for event registrations and saves them in an S3 bucket.  
5. **`/get-qr-code`**: Fetches a time-limited pre-signed URL for secure access to QR codes stored in S3.  
6. **`/log-activity`**: Logs user activities in DynamoDB for tracking and analytics purposes.  

**Additional Serverless Components:**  
- **Amazon S3**: Stores event images and QR codes securely, accessed through pre-signed URLs.  
- **IAM Roles and Policies**: Follow the principle of least privilege, granting only necessary permissions to Lambda functions and other AWS services.  

These serverless components ensure efficient resource utilization and support highly scalable, event-driven workflows, as depicted in the upper right of the diagram.

---

### **Compute**

The compute layer uses **Amazon ECS (Elastic Container Service)** for deploying containerized applications, offering scalability and high availability.  

**Key Compute Components:**  
1. **Frontend and Backend Services**: Deployed as ECS tasks with configurations defined in task definitions. Images are securely stored in Amazon ECR.  
2. **Task Definitions**: Specify resource requirements (CPU, memory) for both frontend and backend services.  
3. **Application Load Balancers (ALBs)**:  
   - One ALB routes public-facing traffic to the frontend service.  
   - Another ALB manages backend service traffic.  

**Database Layer:**  
- **Amazon RDS (PostgreSQL):** Hosts the relational database securely in private subnets.  
- **Amazon ElastiCache (Redis):** Provides in-memory caching to enhance performance.  

Both databases are protected with private security groups and their credentials are managed securely using AWS Secrets Manager.

**Administrative Access:**  
- **Bastion Host (EC2):** A secure instance in a public subnet, granting developers restricted access to private resources for administrative purposes.  

The compute layer ensures seamless traffic flow from the ALB to ECS tasks and secure interactions with the database layer, as shown in the diagram.

---

### **Automation with AWS CloudFormation**

The entire infrastructure is provisioned and managed using AWS CloudFormation templates. This approach ensures:  
- **Repeatability**: Consistent resource deployment across environments.  
- **Efficiency**: Single-operation deployment of the entire architecture.  

---
