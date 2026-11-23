export type CourseLevel = '入门' | '进阶' | '高级';

export interface Course {
  id: string;
  title: string;
  instructor: string;
  chapters: number;
  hours: number;
  level: CourseLevel;
  rating: number;
  students: number;
  tag: string;
}

const TITLES = [
  'React Native 入门实战',
  'Expo 全栈开发指南',
  'TypeScript 类型体操',
  'Node.js 后端架构',
  'iOS 原生开发精讲',
  'Android Kotlin 入门',
  'Flutter 跨平台开发',
  'SwiftUI 从入门到精通',
  'Rust 系统编程',
  'WebAssembly 实战',
  'GraphQL API 设计',
  'Redis 缓存最佳实践',
  'Docker 容器化部署',
  'Kubernetes 运维入门',
  '微服务架构设计',
  '大数据分析实战',
  '机器学习基础',
  '深度学习与神经网络',
  'Prompt Engineering 艺术',
  'AI Agent 开发实战',
];

const INSTRUCTORS = [
  '陈明', '李雪', '王浩', '刘洋', '张悦', '赵峰', '孙丽', '周杰', '吴迪', '郑雯',
];

const TAGS = ['移动开发', '前端', '后端', 'AI', '工程化', '架构', '性能', '安全', '数据'];
const LEVELS: CourseLevel[] = ['入门', '进阶', '高级'];

/**
 * 生成 500 门模拟课程，id 全局唯一且稳定，用于 FlatList 的 keyExtractor。
 */
export function generateCourses(count = 500): Course[] {
  const courses: Course[] = [];
  for (let i = 0; i < count; i++) {
    courses.push({
      id: `course-${i + 1}`,
      title: `${TITLES[i % TITLES.length]} · 第 ${Math.floor(i / TITLES.length) + 1} 季`,
      instructor: INSTRUCTORS[i % INSTRUCTORS.length],
      chapters: 12 + (i * 7) % 40,
      hours: 4 + (i * 3) % 28,
      level: LEVELS[i % LEVELS.length],
      rating: Math.round((3.5 + ((i * 0.13) % 1.5)) * 10) / 10,
      students: 500 + (i * 137) % 9500,
      tag: TAGS[i % TAGS.length],
    });
  }
  return courses;
}

export const MOCK_COURSES = generateCourses();
