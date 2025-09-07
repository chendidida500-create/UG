const axios = require('axios');

// 测试认证API
async function testAuth() {
  try {
    console.log('Testing authentication API...');

    // 测试登录
    const loginResponse = await axios.post('http://localhost:15001/api/auth/login', {
      username: 'admin',
      password: 'admin123'
    });

    console.log('Login response:', loginResponse.data);

    if (loginResponse.data.success) {
      const { token } = loginResponse.data.data;

      // 测试带token的请求
      const protectedResponse = await axios.get('http://localhost:15001/api/users', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log('Protected resource response:', protectedResponse.data);
    }
  } catch (error) {
    console.error('Authentication test failed:', error.response?.data || error.message);
  }
}

testAuth();