export type SongMood =
  | "静か"
  | "穏やか"
  | "あたたかい"
  | "楽しい"
  | "切ない"
  | "未設定";

export type Song = {
  id: string;
  title: string;
  mood: SongMood;
  durationMinutes: number;
  memo: string;
};
