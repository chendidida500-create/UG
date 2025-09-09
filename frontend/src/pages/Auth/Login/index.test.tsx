import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';
import Login from './index.js';

// Mock UMI
jest.mock('umi', () => ({
  history: {
    push: jest.fn(),
  },
  useModel: jest.fn(() => ({
    login: jest.fn(),
    loading: false,
    getRememberedUsername: jest.fn(() => ''),
  })),
  // 添加BrowserRouter的mock实现，使用ReactNode类型
  BrowserRouter: ({ children }: { children: ReactNode }) => (
    <div>{children}</div>
  ),
}));

// Mock Antd message
jest.mock('antd', () => ({
  ...jest.requireActual('antd'),
  message: {
    success: jest.fn(),
    error: jest.fn(),
    warning: jest.fn(),
    info: jest.fn(),
  },
}));

// UMI测试渲染工具
// 修复类型错误，使用ReactNode类型
const renderWithProviders = (ui: ReactNode) => {
  const { BrowserRouter } = require('umi');
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('Login Component', () => {
  const mockLogin = jest.fn();
  const mockGetRememberedUsername = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock useModel
    const { useModel } = require('umi');
    useModel.mockReturnValue({
      login: mockLogin,
      loading: false,
      getRememberedUsername: mockGetRememberedUsername,
    });
  });

  test('renders login form correctly', () => {
    renderWithProviders(<Login />);

    expect(screen.getByText('用户登录')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('用户名/邮箱')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('密码')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '登录' })).toBeInTheDocument();
  });

  test('shows validation errors for empty fields', async () => {
    renderWithProviders(<Login />);

    const loginButton = screen.getByRole('button', { name: '登录' });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText('请输入用户名或邮箱')).toBeInTheDocument();
      expect(screen.getByText('请输入密码')).toBeInTheDocument();
    });
  });

  test('shows validation error for invalid username format', async () => {
    renderWithProviders(<Login />);

    const usernameInput = screen.getByPlaceholderText('用户名/邮箱');
    const loginButton = screen.getByRole('button', { name: '登录' });

    fireEvent.change(usernameInput, { target: { value: 'a' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText('用户名长度至少3位')).toBeInTheDocument();
    });
  });

  test('submits form with valid data', async () => {
    mockLogin.mockResolvedValue({ success: true });

    renderWithProviders(<Login />);

    const usernameInput = screen.getByPlaceholderText('用户名/邮箱');
    const passwordInput = screen.getByPlaceholderText('密码');
    const loginButton = screen.getByRole('button', { name: '登录' });

    fireEvent.change(usernameInput, { target: { value: 'admin' } });
    fireEvent.change(passwordInput, { target: { value: '123456' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        username: 'admin',
        password: '123456',
        remember: false,
      });
    });
  });

  test('handles remember me checkbox', async () => {
    mockLogin.mockResolvedValue({ success: true });

    renderWithProviders(<Login />);

    const usernameInput = screen.getByPlaceholderText('用户名/邮箱');
    const passwordInput = screen.getByPlaceholderText('密码');
    const rememberCheckbox = screen.getByRole('checkbox', { name: '记住密码' });
    const loginButton = screen.getByRole('button', { name: '登录' });

    fireEvent.change(usernameInput, { target: { value: 'admin' } });
    fireEvent.change(passwordInput, { target: { value: '123456' } });
    fireEvent.click(rememberCheckbox);
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        username: 'admin',
        password: '123456',
        remember: true,
      });
    });
  });

  test('displays loading state during login', () => {
    const { useModel } = require('umi');
    useModel.mockReturnValue({
      login: mockLogin,
      loading: true,
      getRememberedUsername: mockGetRememberedUsername,
    });

    renderWithProviders(<Login />);

    const loginButton = screen.getByRole('button', { name: '登录' });
    expect(loginButton).toHaveAttribute('disabled');
  });

  test('handles login error', async () => {
    const errorMessage = '用户名或密码错误';
    mockLogin.mockRejectedValue(new Error(errorMessage));

    renderWithProviders(<Login />);

    const usernameInput = screen.getByPlaceholderText('用户名/邮箱');
    const passwordInput = screen.getByPlaceholderText('密码');
    const loginButton = screen.getByRole('button', { name: '登录' });

    fireEvent.change(usernameInput, { target: { value: 'admin' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalled();
    });
  });

  test('navigates to register page', () => {
    const { history } = require('umi');

    renderWithProviders(<Login />);

    const registerLink = screen.getByText('立即注册');
    fireEvent.click(registerLink);

    expect(history.push).toHaveBeenCalledWith('/auth/register');
  });

  test('loads remembered username on mount', () => {
    mockGetRememberedUsername.mockReturnValue('remembered_user');

    renderWithProviders(<Login />);

    expect(mockGetRememberedUsername).toHaveBeenCalled();

    const usernameInput = screen.getByPlaceholderText('用户名/邮箱');
    expect(usernameInput).toHaveValue('remembered_user');
  });

  test('validates email format correctly', async () => {
    renderWithProviders(<Login />);

    const usernameInput = screen.getByPlaceholderText('用户名/邮箱');
    const loginButton = screen.getByRole('button', { name: '登录' });

    // 测试无效邮箱格式
    fireEvent.change(usernameInput, { target: { value: 'invalid.email' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText('请输入有效的邮箱地址')).toBeInTheDocument();
    });

    // 测试有效邮箱格式
    fireEvent.change(usernameInput, { target: { value: 'test@example.com' } });

    await waitFor(() => {
      expect(
        screen.queryByText('请输入有效的邮箱地址')
      ).not.toBeInTheDocument();
    });
  });
});
