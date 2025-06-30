import fetch from 'node-fetch';

const API_BASE_URL = 'http://localhost:5000/api';

// Test data
const testUser = {
  email: 'test@example.com',
  password: 'password123',
  name: 'Test User',
  role: 'candidate'
};

let authToken = '';

async function testAPI() {
  console.log('🧪 Testing Candidate Dashboard API...\n');

  try {
    // Test 1: Sign up a test user
    console.log('1. Testing user signup...');
    const signupResponse = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testUser),
    });

    if (signupResponse.ok) {
      const signupData = await signupResponse.json();
      authToken = signupData.token;
      console.log('✅ Signup successful');
    } else {
      console.log('⚠️  User might already exist, trying login...');
      const loginResponse = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: testUser.email,
          password: testUser.password,
        }),
      });

      if (loginResponse.ok) {
        const loginData = await loginResponse.json();
        authToken = loginData.token;
        console.log('✅ Login successful');
      } else {
        throw new Error('Failed to authenticate');
      }
    }

    // Test 2: Get candidate profile
    console.log('\n2. Testing get candidate profile...');
    const profileResponse = await fetch(`${API_BASE_URL}/candidate/profile`, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    });

    if (profileResponse.ok) {
      const profileData = await profileResponse.json();
      console.log('✅ Profile retrieved successfully');
      console.log('   Profile completion:', profileData.user.profileCompletion + '%');
    } else {
      console.log('❌ Failed to get profile');
    }

    // Test 3: Add skills
    console.log('\n3. Testing add skills...');
    const skillsResponse = await fetch(`${API_BASE_URL}/candidate/add-skills`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        skills: ['React', 'TypeScript', 'Node.js', 'MongoDB']
      }),
    });

    if (skillsResponse.ok) {
      const skillsData = await skillsResponse.json();
      console.log('✅ Skills added successfully');
      console.log('   Skills:', skillsData.skills.join(', '));
      console.log('   Profile completion:', skillsData.profileCompletion + '%');
    } else {
      console.log('❌ Failed to add skills');
    }

    // Test 4: Add portfolio
    console.log('\n4. Testing add portfolio...');
    const portfolioResponse = await fetch(`${API_BASE_URL}/candidate/add-portfolio`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        portfolio: 'https://github.com/testuser'
      }),
    });

    if (portfolioResponse.ok) {
      const portfolioData = await portfolioResponse.json();
      console.log('✅ Portfolio added successfully');
      console.log('   Portfolio:', portfolioData.portfolio);
      console.log('   Profile completion:', portfolioData.profileCompletion + '%');
    } else {
      console.log('❌ Failed to add portfolio');
    }

    // Test 5: Add job description
    console.log('\n5. Testing add job description...');
    const jobDescResponse = await fetch(`${API_BASE_URL}/candidate/add-job-description`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        jobDescription: 'We are looking for a React developer with experience in TypeScript and Node.js. The ideal candidate should have 2+ years of experience in frontend development and be familiar with modern web technologies.'
      }),
    });

    if (jobDescResponse.ok) {
      const jobDescData = await jobDescResponse.json();
      console.log('✅ Job description added successfully');
      console.log('   Profile completion:', jobDescData.profileCompletion + '%');
    } else {
      console.log('❌ Failed to add job description');
    }

    // Test 6: Start interview
    console.log('\n6. Testing start interview...');
    const interviewResponse = await fetch(`${API_BASE_URL}/candidate/start-interview`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    });

    if (interviewResponse.ok) {
      const interviewData = await interviewResponse.json();
      console.log('✅ Interview started successfully');
      console.log('   Mock interviews count:', interviewData.mockInterviews);
    } else {
      console.log('❌ Failed to start interview');
    }

    // Test 7: Get final profile
    console.log('\n7. Testing get final profile...');
    const finalProfileResponse = await fetch(`${API_BASE_URL}/candidate/profile`, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    });

    if (finalProfileResponse.ok) {
      const finalProfileData = await finalProfileResponse.json();
      console.log('✅ Final profile retrieved successfully');
      console.log('   Final profile completion:', finalProfileData.user.profileCompletion + '%');
      console.log('   Skills count:', finalProfileData.user.skills?.length || 0);
      console.log('   Portfolio:', finalProfileData.user.portfolio || 'Not set');
      console.log('   Mock interviews:', finalProfileData.user.mockInterviews || 0);
    } else {
      console.log('❌ Failed to get final profile');
    }

    console.log('\n🎉 All tests completed!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testAPI(); 