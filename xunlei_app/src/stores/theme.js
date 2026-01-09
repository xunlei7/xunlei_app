import { writable } from 'svelte/store';

// 从 localStorage 读取用户偏好，如果没有则根据时间自动判断
function getInitialTheme() {
  if (typeof window === 'undefined') return true; // SSR 安全
  
  const stored = localStorage.getItem('theme');
  if (stored !== null) {
    return stored === 'light';
  }
  
  // 如果没有存储的偏好，根据当前时间判断
  const currentHour = new Date().getHours();
  return currentHour >= 6 && currentHour < 18;
}

// 创建可写 store
export const isDayTime = writable(getInitialTheme());

// 监听变化，保存到 localStorage
if (typeof window !== 'undefined') {
  isDayTime.subscribe(value => {
    localStorage.setItem('theme', value ? 'light' : 'dark');
  });
}

// 主题切换函数
export function toggleTheme() {
  isDayTime.update(n => !n);
}

// 自动更新主题（根据时间）
export function updateThemeByTime() {
  const currentHour = new Date().getHours();
  const shouldBeDayTime = currentHour >= 6 && currentHour < 18;
  
  // 只有当用户没有手动设置过主题时才自动更新
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('theme');
    if (stored === null) {
      isDayTime.set(shouldBeDayTime);
    }
  }
}
