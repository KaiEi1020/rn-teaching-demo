import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';

const PROFILE_STATS = [
  { label: '已学课程', value: '12' },
  { label: '学习时长', value: '48h' },
  { label: '证书', value: '5' },
];

const MENU = [
  { title: '我的收藏', hint: '12 门课程' },
  { title: '学习记录', hint: '最近 7 天' },
  { title: '我的证书', hint: '5 张已获得' },
  { title: '账号设置', hint: '个人信息 / 密码' },
];

export default function ProfileScreen() {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView contentContainerStyle={styles.content}>
          {/* 个人信息卡 */}
          <ThemedView type="backgroundElement" style={styles.profileCard}>
            <ThemedView style={styles.avatar}>
              <ThemedText type="title" style={styles.avatarText}>
                学
              </ThemedText>
            </ThemedView>
            <ThemedView style={styles.profileInfo}>
              <ThemedText type="subtitle">学习小能手</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                已加入 120 天 · 终身会员
              </ThemedText>
            </ThemedView>
          </ThemedView>

          {/* 学习数据 */}
          <ThemedView style={styles.statsRow}>
            {PROFILE_STATS.map((item) => (
              <ThemedView key={item.label} type="backgroundElement" style={styles.statBox}>
                <ThemedText type="subtitle" style={styles.statValue}>
                  {item.value}
                </ThemedText>
                <ThemedText type="small" themeColor="textSecondary">
                  {item.label}
                </ThemedText>
              </ThemedView>
            ))}
          </ThemedView>

          {/* 菜单列表 */}
          <ThemedView type="backgroundElement" style={styles.menuGroup}>
            {MENU.map((item, index) => {
              const isLast = index === MENU.length - 1;
              return (
                <Pressable key={item.title} style={({ pressed }) => pressed && styles.pressed}>
                  <ThemedView
                    style={[styles.menuRow, !isLast && styles.menuDivider]}>
                    <ThemedText type="default">{item.title}</ThemedText>
                    <ThemedView style={styles.menuRight}>
                      <ThemedText type="small" themeColor="textSecondary">
                        {item.hint}
                      </ThemedText>
                      <ThemedText type="small" themeColor="textSecondary">
                        ›
                      </ThemedText>
                    </ThemedView>
                  </ThemedView>
                </Pressable>
              );
            })}
          </ThemedView>

          <Link href="/courses" asChild>
            <Pressable style={({ pressed }) => [styles.logoutButton, pressed && styles.pressed]}>
              <ThemedText type="linkPrimary">去看看全部课程</ThemedText>
            </Pressable>
          </Link>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    alignSelf: 'center',
    width: '100%',
    maxWidth: MaxContentWidth,
  },
  content: {
    paddingHorizontal: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.four,
    gap: Spacing.three,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    padding: Spacing.four,
    borderRadius: Spacing.three,
    marginTop: Spacing.four,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#3c87f7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 24,
    lineHeight: 28,
  },
  profileInfo: {
    gap: Spacing.half,
  },
  statsRow: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.three,
    borderRadius: Spacing.three,
    gap: Spacing.half,
  },
  statValue: {
    fontSize: 26,
    lineHeight: 30,
  },
  menuGroup: {
    borderRadius: Spacing.three,
    marginTop: Spacing.two,
    overflow: 'hidden',
  },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
  },
  menuDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#8884',
  },
  menuRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  logoutButton: {
    alignItems: 'center',
    paddingVertical: Spacing.three,
    marginTop: Spacing.two,
  },
  pressed: {
    opacity: 0.6,
  },
});
