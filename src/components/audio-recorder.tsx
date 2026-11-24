import { useEffect, useRef, useState } from 'react';
import { Alert, Pressable, StyleSheet } from 'react-native';

import {
  AudioModule,
  RecordingPresets,
  setAudioModeAsync,
  useAudioPlayer,
  useAudioRecorder,
  useAudioRecorderState,
} from 'expo-audio';

import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';
import { Spacing } from '@/constants/theme';

/**
 * 录音演示组件。完整覆盖录音五步骤：
 *   1. 申请麦克风权限
 *   2. 设置音频模式（allowsRecording / playsInSilentMode）
 *   3. 创建录音器（useAudioRecorder）
 *   4. prepareToRecordAsync → record 开始录音
 *   5. stop 停止，从 recorder.uri 拿到文件
 *
 * 参考：https://docs.expo.dev/versions/v58.0.0/sdk/audio/
 */
function AudioRecorderInner() {
  const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const state = useAudioRecorderState(recorder);

  // 录完后的文件地址，用于回放验证
  const [recordingUri, setRecordingUri] = useState<string | null>(null);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // 用于在组件卸载时兜底停止录音，避免麦克风被一直占用
  const recorderRef = useRef(recorder);
  recorderRef.current = recorder;
  const isRecordingRef = useRef(state.isRecording);
  isRecordingRef.current = state.isRecording;

  // 播放器：source 为 null 时不加载，录完后把 uri 丢进去即可回放
  const player = useAudioPlayer(recordingUri);

  // 1. 申请权限 + 2. 设置音频模式
  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const result = await AudioModule.requestRecordingPermissionsAsync();
        if (!active) return;

        setPermissionGranted(result.granted);
        if (!result.granted) {
          Alert.alert('无法录音', '请在系统设置中授权麦克风权限后再试。');
          return;
        }

        await setAudioModeAsync({
          allowsRecording: true,
          playsInSilentMode: true,
        });
      } catch (e) {
        if (active) setErrorMsg(e instanceof Error ? e.message : String(e));
      }
    })();

    return () => {
      active = false;
      // 组件卸载时如果还在录音，兜底停掉
      if (isRecordingRef.current) {
        recorderRef.current.stop().catch(() => {});
      }
    };
  }, []);

  // 4. 开始录音
  const startRecording = async () => {
    if (!permissionGranted) {
      Alert.alert('请先授权麦克风');
      return;
    }
    setErrorMsg(null);
    try {
      await recorder.prepareToRecordAsync();
      recorder.record();
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : String(e));
    }
  };

  // 5. 停止录音，拿到 uri
  const stopRecording = async () => {
    try {
      await recorder.stop();
      if (recorder.uri) {
        setRecordingUri(recorder.uri);
      }
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : String(e));
    }
  };

  const seconds = Math.round(state.durationMillis / 1000);

  return (
    <ThemedView type="backgroundElement" style={styles.card}>
      <ThemedText type="smallBold">语音作业录音</ThemedText>

      <ThemedText type="small" themeColor="textSecondary">
        状态：{state.isRecording ? '🔴 录音中' : '未录音'}
      </ThemedText>
      <ThemedText type="small" themeColor="textSecondary">
        时长：{seconds} 秒
      </ThemedText>
      <ThemedText type="small" themeColor="textSecondary">
        权限：{permissionGranted ? '已授权' : '未授权'}
      </ThemedText>

      {recordingUri && (
        <ThemedText type="small" themeColor="textSecondary" numberOfLines={1}>
          文件：{recordingUri}
        </ThemedText>
      )}

      {errorMsg && (
        <ThemedText type="small" style={{ color: '#e03131' }}>
          出错：{errorMsg}
        </ThemedText>
      )}

      <ThemedView style={styles.btnRow}>
        <Pressable
          onPress={startRecording}
          disabled={state.isRecording || !permissionGranted}
          style={({ pressed }) => [
            styles.btn,
            (state.isRecording || !permissionGranted) && styles.btnDisabled,
            pressed && styles.btnPressed,
          ]}>
          <ThemedText type="smallBold" style={styles.btnText}>
            开始录音
          </ThemedText>
        </Pressable>

        <Pressable
          onPress={stopRecording}
          disabled={!state.isRecording}
          style={({ pressed }) => [
            styles.btn,
            !state.isRecording && styles.btnDisabled,
            pressed && styles.btnPressed,
          ]}>
          <ThemedText type="smallBold" style={styles.btnText}>
            停止录音
          </ThemedText>
        </Pressable>

        <Pressable
          onPress={() => recordingUri && player.play()}
          disabled={!recordingUri}
          style={({ pressed }) => [
            styles.btn,
            !recordingUri && styles.btnDisabled,
            pressed && styles.btnPressed,
          ]}>
          <ThemedText type="smallBold" style={styles.btnText}>
            回放
          </ThemedText>
        </Pressable>
      </ThemedView>
    </ThemedView>
  );
}

/**
 * 录音是纯客户端/设备能力：web 端 useAudioPlayer 会实例化 HTML Audio 元素，
 * Node SSR 环境里 Audio 未定义，会导致服务端渲染抛错。
 * 因此外层只在客户端挂载（mounted）后才渲染真正使用 hooks 的组件，
 * SSR 阶段返回 null，不影响页面其余内容的渲染。
 */
export default function AudioRecorder() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
  return <AudioRecorderInner />;
}

const styles = StyleSheet.create({
  card: {
    padding: Spacing.three,
    borderRadius: Spacing.three,
    gap: Spacing.one,
  },
  btnRow: {
    flexDirection: 'row',
    gap: Spacing.two,
    marginTop: Spacing.two,
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.two,
    borderRadius: Spacing.two,
    backgroundColor: '#3c87f7',
  },
  btnText: {
    color: '#fff',
  },
  btnDisabled: {
    opacity: 0.4,
  },
  btnPressed: {
    opacity: 0.8,
  },
});
