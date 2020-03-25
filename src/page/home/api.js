import http from '@/http';

/**
 * 登录
 */
export function login(data) {
  return http({
    url: '/health/user/login',
    method: 'post',
    data,
    params: data
  });
}
