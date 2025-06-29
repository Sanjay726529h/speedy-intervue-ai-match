# MongoDB Atlas Setup for SpeedyIntervue

This guide will help you set up MongoDB Atlas (cloud database) for your SpeedyIntervue project.

## Step 1: Create MongoDB Atlas Account

1. **Go to MongoDB Atlas**
   - Visit [mongodb.com/atlas](https://www.mongodb.com/atlas)
   - Click "Try Free" or "Get Started Free"

2. **Sign Up**
   - Create a new account or sign in with Google/GitHub
   - Fill in your details

## Step 2: Create a Cluster

1. **Choose Cluster Type**
   - Select "FREE" tier (M0 Sandbox)
   - Click "Create"

2. **Configure Cluster**
   - **Cloud Provider**: Choose AWS, Google Cloud, or Azure (any is fine)
   - **Region**: Choose closest to your location
   - **Cluster Name**: Leave default or name it "speedy-intervue"
   - Click "Create Cluster"

## Step 3: Set Up Database Access

1. **Create Database User**
   - In the left sidebar, click "Database Access"
   - Click "Add New Database User"
   - **Username**: Create a username (e.g., "speedy-intervue-user")
   - **Password**: Create a strong password (save this!)
   - **Database User Privileges**: Select "Read and write to any database"
   - Click "Add User"

## Step 4: Set Up Network Access

1. **Configure IP Access**
   - In the left sidebar, click "Network Access"
   - Click "Add IP Address"
   - For development: Click "Allow Access from Anywhere" (0.0.0.0/0)
   - For production: Add specific IP addresses
   - Click "Confirm"

## Step 5: Get Connection String

1. **Connect to Cluster**
   - Go back to "Database" in the left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"

2. **Copy Connection String**
   - Select "Node.js" as your driver
   - Copy the connection string
   - It looks like: `mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority`

## Step 6: Update Your Configuration

1. **Edit server/config.env**
   ```env
   MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/speedy-intervue?retryWrites=true&w=majority
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   PORT=5000
   ```

2. **Replace placeholders**:
   - `your-username`: The database username you created
   - `your-password`: The database password you created
   - `your-cluster`: Your actual cluster name

## Step 7: Test the Connection

1. **Start the Backend Server**
   ```bash
   cd server
   npm run dev
   ```

2. **Check for Success**
   - You should see "MongoDB Connected" in the console
   - If you see errors, check your connection string and credentials

## Security Best Practices

1. **Environment Variables**
   - Never commit passwords to git
   - Use environment variables in production

2. **Network Security**
   - For production, restrict IP access to your server IPs
   - Use VPC peering for better security

3. **Database User**
   - Use strong passwords
   - Grant minimal required privileges

## Troubleshooting

### Connection Issues
- **Authentication failed**: Check username/password
- **Network timeout**: Check IP whitelist
- **Invalid connection string**: Verify the format

### Common Errors
- **MongoServerSelectionError**: Check network access
- **Authentication failed**: Verify database user credentials
- **ENOTFOUND**: Check cluster name in connection string

## Next Steps

After Atlas setup:
1. Start your backend server
2. Start your frontend application
3. Test signup/login functionality
4. Check MongoDB Atlas dashboard to see data

## Atlas Dashboard Features

- **Collections**: View your data
- **Performance**: Monitor database performance
- **Logs**: View database logs
- **Alerts**: Set up monitoring alerts 