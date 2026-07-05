import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, ReferenceLine, AreaChart, Area, PieChart, Pie, Cell,
} from "recharts";
import {
  LayoutDashboard, Upload, Settings as SettingsIcon, TrendingUp, TrendingDown,
  ChevronRight, ChevronDown, ChevronLeft, Plus, Trash2, Check, AlertTriangle, X,
  Clock, Calendar, Menu, Download, Save, RefreshCw, ArrowUpRight, ArrowDownRight,
  Minus, Award, BarChart3, FileText, UserCog, Target, Building2, Users,
  CheckCircle2, CircleDashed, AlertCircle, Eye, EyeOff, ArrowRight, Banknote,
  UserPlus, UserMinus, Percent, Info, Loader2, Copy,
} from "lucide-react";
import Papa from "papaparse";

const MarketingApp = React.lazy(() => import("./src/marketing/MarketingArtifact.jsx"));
const SEED_DATA = 
{"staff": [{"name": "三浦", "active": true}, {"name": "服部", "active": true}, {"name": "田頭", "active": true}, {"name": "古川", "active": true}, {"name": "高橋", "active": true}, {"name": "山崎", "active": true}, {"name": "可知", "active": true}, {"name": "石田", "active": true}, {"name": "桂", "active": true}, {"name": "冨田", "active": true}, {"name": "角野", "active": true}, {"name": "野呂", "active": true}, {"name": "箱崎", "active": true}, {"name": "南雲", "active": true}, {"name": "東山", "active": true}, {"name": "浅見", "active": true}, {"name": "相川", "active": true}, {"name": "藤井", "active": true}, {"name": "星野", "active": true}, {"name": "黒澤", "active": true}, {"name": "不明", "active": true}, {"name": "再入会", "active": true}, {"name": "過去スタッフ", "active": true}], "trials": [{"id": "t2", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-01-07", "lessonDate": "2026-01-08", "startTime": "19:30", "memberId": "2346", "name": "山田 優奈", "gender": "女性", "age": 40, "joinMonth": 1, "staff": "過去スタッフ", "note": ""}, {"id": "t3", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-01-04", "lessonDate": "2026-01-10", "startTime": "09:30", "memberId": "2347", "name": "高橋 亮司", "gender": "男性", "age": 40, "joinMonth": 1, "staff": "再入会", "note": ""}, {"id": "t4", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-01-04", "lessonDate": "2026-01-10", "startTime": "11:00", "memberId": "2348", "name": "桐畑 祥子", "gender": "女性", "age": 58, "joinMonth": 2, "staff": "過去スタッフ", "note": ""}, {"id": "t5", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-01-10", "lessonDate": "2026-01-11", "startTime": "10:00", "memberId": "2360", "name": "高橋 みなみ", "gender": "女性", "age": 40, "joinMonth": 1, "staff": "過去スタッフ", "note": ""}, {"id": "t6", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-01-07", "lessonDate": "2026-01-12", "startTime": "10:30", "memberId": "2352", "name": "立和 勇人", "gender": "男性", "age": 26, "joinMonth": 1, "staff": "服部", "note": ""}, {"id": "t7", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-01-13", "lessonDate": "2026-01-14", "startTime": "10:30", "memberId": "2367", "name": "小林 明彦", "gender": "男性", "age": 35, "joinMonth": null, "staff": "古川", "note": ""}, {"id": "t8", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-01-14", "lessonDate": "2026-01-14", "startTime": "17:30", "memberId": "2368", "name": "高中 里沙", "gender": "女性", "age": 38, "joinMonth": 1, "staff": "服部", "note": ""}, {"id": "t9", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-01-13", "lessonDate": "2026-01-17", "startTime": "10:30", "memberId": "45", "name": "牧角 香苗", "gender": "女性", "age": 60, "joinMonth": 3, "staff": "再入会", "note": ""}, {"id": "t10", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-01-14", "lessonDate": "2026-01-19", "startTime": "12:00", "memberId": "2369", "name": "山田 亜矢", "gender": "女性", "age": 52, "joinMonth": 1, "staff": "古川", "note": ""}, {"id": "t11", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-01-20", "lessonDate": "2026-01-21", "startTime": "10:30", "memberId": "2374", "name": "浜崎 武", "gender": "男性", "age": 48, "joinMonth": 2, "staff": "過去スタッフ", "note": ""}, {"id": "t12", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-01-20", "lessonDate": "2026-01-21", "startTime": "12:00", "memberId": "2375", "name": "久島 えり子", "gender": "女性", "age": 64, "joinMonth": 1, "staff": "古川", "note": ""}, {"id": "t13", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-01-17", "lessonDate": "2026-01-22", "startTime": "19:00", "memberId": "2371", "name": "Totani Yutaka", "gender": "男性", "age": 22, "joinMonth": 1, "staff": "冨田", "note": ""}, {"id": "t14", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-01-19", "lessonDate": "2026-01-24", "startTime": "09:30", "memberId": "2373", "name": "佐藤 久美子", "gender": "女性", "age": 45, "joinMonth": 2, "staff": "過去スタッフ", "note": ""}, {"id": "t15", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-01-26", "lessonDate": "2026-01-26", "startTime": "11:00", "memberId": "2388", "name": "渡辺 有紀", "gender": "女性", "age": 49, "joinMonth": 1, "staff": "高橋", "note": ""}, {"id": "t16", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-01-28", "lessonDate": "2026-01-29", "startTime": "10:30", "memberId": "2392", "name": "柿澤 亮佑", "gender": "男性", "age": 33, "joinMonth": null, "staff": "過去スタッフ", "note": ""}, {"id": "t17", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-01-30", "lessonDate": "2026-01-31", "startTime": "16:00", "memberId": "2398", "name": "小田 勝久", "gender": "男性", "age": 64, "joinMonth": 2, "staff": "過去スタッフ", "note": ""}, {"id": "t18", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-01-02", "lessonDate": "2026-01-04", "startTime": "11:00", "memberId": "2345", "name": "武村 真紀", "gender": "女性", "age": 37, "joinMonth": 1, "staff": "服部", "note": ""}, {"id": "t19", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-01-02", "lessonDate": "2026-01-05", "startTime": "11:30", "memberId": "2344", "name": "小池 穂花", "gender": "女性", "age": 23, "joinMonth": null, "staff": "服部", "note": ""}, {"id": "t20", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-01-06", "lessonDate": "2026-01-06", "startTime": "20:00", "memberId": "2350", "name": "三條 ともこ", "gender": "女性", "age": 50, "joinMonth": null, "staff": "服部", "note": ""}, {"id": "t21", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-01-06", "lessonDate": "2026-01-07", "startTime": "13:00", "memberId": "2351", "name": "後藤 さゆり", "gender": "女性", "age": 43, "joinMonth": 1, "staff": "服部", "note": ""}, {"id": "t22", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-01-09", "lessonDate": "2026-01-10", "startTime": "13:00", "memberId": "2354", "name": "栗原 広樹", "gender": "男性", "age": 46, "joinMonth": 1, "staff": "三浦", "note": ""}, {"id": "t23", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-01-10", "lessonDate": "2026-01-10", "startTime": "19:00", "memberId": "2361", "name": "岩山 浩之", "gender": "男性", "age": 55, "joinMonth": 1, "staff": "服部", "note": ""}, {"id": "t24", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-01-07", "lessonDate": "2026-01-11", "startTime": "10:00", "memberId": "2353", "name": "大野 遙", "gender": "女性", "age": 38, "joinMonth": 1, "staff": "石田", "note": ""}, {"id": "t25", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-01-10", "lessonDate": "2026-01-11", "startTime": "12:30", "memberId": "2355", "name": "遠藤 綾子", "gender": "女性", "age": 34, "joinMonth": 1, "staff": "服部", "note": ""}, {"id": "t26", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-01-08", "lessonDate": "2026-01-11", "startTime": "17:00", "memberId": "2358", "name": "海老名 久美", "gender": "女性", "age": 54, "joinMonth": 1, "staff": "南雲", "note": ""}, {"id": "t27", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-01-10", "lessonDate": "2026-01-11", "startTime": "17:00", "memberId": "2362", "name": "橋本 遥", "gender": "女性", "age": 37, "joinMonth": 1, "staff": "東山", "note": ""}, {"id": "t28", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-01-11", "lessonDate": "2026-01-12", "startTime": "10:30", "memberId": "2363", "name": "佐伯 桜", "gender": "女性", "age": 50, "joinMonth": 1, "staff": "石田", "note": ""}, {"id": "t29", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-01-11", "lessonDate": "2026-01-12", "startTime": "12:00", "memberId": "2349", "name": "油谷 加奈子", "gender": "女性", "age": 45, "joinMonth": 1, "staff": "石田", "note": ""}, {"id": "t30", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-01-12", "lessonDate": "2026-01-12", "startTime": "19:00", "memberId": "2364", "name": "竹中 月子", "gender": "女性", "age": 25, "joinMonth": 1, "staff": "東山", "note": ""}, {"id": "t31", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-01-19", "lessonDate": "2026-01-21", "startTime": "14:00", "memberId": "2372", "name": "児玉 芽生", "gender": "女性", "age": 28, "joinMonth": 2, "staff": "服部", "note": ""}, {"id": "t32", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-01-19", "lessonDate": "2026-01-21", "startTime": "16:00", "memberId": "2359", "name": "船津 いづみ", "gender": "女性", "age": 59, "joinMonth": 2, "staff": "服部", "note": ""}, {"id": "t33", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-01-22", "lessonDate": "2026-01-22", "startTime": "19:00", "memberId": "2378", "name": "稲垣 綾", "gender": "女性", "age": 54, "joinMonth": 1, "staff": "桂", "note": ""}, {"id": "t34", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-01-23", "lessonDate": "2026-01-23", "startTime": "12:30", "memberId": "2381", "name": "西村 珠美", "gender": "女性", "age": 56, "joinMonth": 2, "staff": "角野", "note": ""}, {"id": "t35", "store": "狛江", "ticket": "無料体験チケット（２回目）", "applyDate": "2026-01-22", "lessonDate": "2026-01-23", "startTime": "17:00", "memberId": "2190", "name": "千葉 弘子", "gender": "女性", "age": 52, "joinMonth": 2, "staff": "可知", "note": ""}, {"id": "t36", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-01-22", "lessonDate": "2026-01-24", "startTime": "14:00", "memberId": "2377", "name": "渡邉 晴香", "gender": "女性", "age": 20, "joinMonth": 2, "staff": "服部", "note": ""}, {"id": "t37", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-01-24", "lessonDate": "2026-01-24", "startTime": "18:00", "memberId": "2383", "name": "安藤 啓之", "gender": "男性", "age": 28, "joinMonth": null, "staff": "服部", "note": ""}, {"id": "t38", "store": "狛江", "ticket": "無料体験チケット", "applyDate": null, "lessonDate": "2026-01-24", "startTime": null, "memberId": null, "name": "山内 美沙希", "gender": "女性", "age": null, "joinMonth": null, "staff": "服部", "note": ""}, {"id": "t39", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-01-25", "lessonDate": "2026-01-25", "startTime": "09:45", "memberId": "2376", "name": "永井 日菜", "gender": "女性", "age": 23, "joinMonth": null, "staff": "服部", "note": ""}, {"id": "t40", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-01-24", "lessonDate": "2026-01-25", "startTime": "10:30", "memberId": "2386", "name": "矢口 美幸", "gender": "女性", "age": 45, "joinMonth": 2, "staff": "石田", "note": ""}, {"id": "t41", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-01-25", "lessonDate": "2026-01-25", "startTime": "16:00", "memberId": "2387", "name": "山縣 志帆", "gender": "女性", "age": 23, "joinMonth": 2, "staff": "服部", "note": ""}, {"id": "t42", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-01-27", "lessonDate": "2026-01-30", "startTime": "18:30", "memberId": "2389", "name": "得野 晃平", "gender": "女性", "age": 34, "joinMonth": null, "staff": "東山", "note": ""}, {"id": "t43", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-01-28", "lessonDate": "2026-01-31", "startTime": "09:30", "memberId": "2391", "name": "秋元 仁美", "gender": "女性", "age": 41, "joinMonth": 2, "staff": "石田", "note": ""}, {"id": "t44", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-01-28", "lessonDate": "2026-01-31", "startTime": "14:30", "memberId": "2390", "name": "飛田 敦", "gender": "男性", "age": 30, "joinMonth": 2, "staff": "服部", "note": ""}, {"id": "t45", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-01-24", "lessonDate": "2026-02-01", "startTime": "11:30", "memberId": "2382", "name": "糸山 あゆみ", "gender": "女性", "age": 37, "joinMonth": 2, "staff": "過去スタッフ", "note": ""}, {"id": "t46", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-01-30", "lessonDate": "2026-02-01", "startTime": "17:30", "memberId": "2397", "name": "加藤 真由子", "gender": "女性", "age": 44, "joinMonth": 2, "staff": "冨田", "note": ""}, {"id": "t47", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-01-29", "lessonDate": "2026-02-02", "startTime": "11:30", "memberId": "2393", "name": "入江 慶", "gender": "男性", "age": 36, "joinMonth": null, "staff": "古川", "note": ""}, {"id": "t48", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-02-02", "lessonDate": "2026-02-02", "startTime": "18:00", "memberId": "2404", "name": "安藤 輝子", "gender": "女性", "age": 53, "joinMonth": 2, "staff": "冨田", "note": ""}, {"id": "t49", "store": "梅ヶ丘", "ticket": "無料体験チケット（２回目）", "applyDate": "2026-02-01", "lessonDate": "2026-02-03", "startTime": "16:00", "memberId": "2093", "name": "浅見 ダイヤ", "gender": "女性", "age": 22, "joinMonth": 2, "staff": "服部", "note": ""}, {"id": "t50", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-01-22", "lessonDate": "2026-02-04", "startTime": "11:00", "memberId": "2380", "name": "堀 裕美子", "gender": "女性", "age": 54, "joinMonth": 2, "staff": "古川", "note": ""}, {"id": "t51", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-01-29", "lessonDate": "2026-02-05", "startTime": "11:00", "memberId": "2394", "name": "石神 ルリ子", "gender": "女性", "age": 66, "joinMonth": 2, "staff": "高橋", "note": ""}, {"id": "t52", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-02-03", "lessonDate": "2026-02-05", "startTime": "20:00", "memberId": "2407", "name": "市川 美紀", "gender": "女性", "age": 51, "joinMonth": 2, "staff": "冨田", "note": ""}, {"id": "t53", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-02-06", "lessonDate": "2026-02-06", "startTime": "17:00", "memberId": "2413", "name": "前田 千鶴", "gender": "女性", "age": 36, "joinMonth": 2, "staff": "過去スタッフ", "note": ""}, {"id": "t54", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-02-06", "lessonDate": "2026-02-06", "startTime": "19:30", "memberId": "2412", "name": "伊藤 寿真", "gender": "女性", "age": 28, "joinMonth": 2, "staff": "冨田", "note": ""}, {"id": "t55", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-02-06", "lessonDate": "2026-02-07", "startTime": "11:30", "memberId": "2401", "name": "工藤 貴代美", "gender": "女性", "age": 43, "joinMonth": 2, "staff": "石田", "note": ""}, {"id": "t56", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-01-31", "lessonDate": "2026-02-08", "startTime": "11:00", "memberId": "2399", "name": "西川 恵", "gender": "女性", "age": 49, "joinMonth": 2, "staff": "過去スタッフ", "note": ""}, {"id": "t57", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-02-07", "lessonDate": "2026-02-08", "startTime": "14:00", "memberId": "2416", "name": "三味 秀樹", "gender": "男性", "age": 58, "joinMonth": 2, "staff": "過去スタッフ", "note": ""}, {"id": "t58", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-02-06", "lessonDate": "2026-02-11", "startTime": "17:30", "memberId": "2400", "name": "平 芙実加", "gender": "女性", "age": 33, "joinMonth": 2, "staff": "過去スタッフ", "note": ""}, {"id": "t59", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-02-12", "lessonDate": "2026-02-13", "startTime": "14:30", "memberId": "2426", "name": "大川 ちかこ", "gender": "女性", "age": 61, "joinMonth": 2, "staff": "過去スタッフ", "note": ""}, {"id": "t60", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-02-01", "lessonDate": "2026-02-14", "startTime": "09:30", "memberId": "2402", "name": "澤田 かな子", "gender": "女性", "age": 32, "joinMonth": null, "staff": "石田", "note": ""}, {"id": "t61", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-02-09", "lessonDate": "2026-02-14", "startTime": "11:30", "memberId": "2420", "name": "横山 記子", "gender": "女性", "age": 29, "joinMonth": 2, "staff": "石田", "note": ""}, {"id": "t62", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-02-15", "lessonDate": "2026-02-20", "startTime": "17:30", "memberId": "2436", "name": "大坪 朋子", "gender": "女性", "age": 54, "joinMonth": 2, "staff": "冨田", "note": ""}, {"id": "t63", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-02-18", "lessonDate": "2026-02-20", "startTime": "19:00", "memberId": "2440", "name": "阿知和 郁也", "gender": "男性", "age": 48, "joinMonth": null, "staff": "冨田", "note": ""}, {"id": "t64", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-02-21", "lessonDate": "2026-02-21", "startTime": "14:00", "memberId": "2446", "name": "和田 玲子", "gender": "女性", "age": 63, "joinMonth": 2, "staff": "過去スタッフ", "note": ""}, {"id": "t65", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-02-20", "lessonDate": "2026-02-21", "startTime": "18:00", "memberId": "2395", "name": "杉山 和子", "gender": "女性", "age": 49, "joinMonth": 2, "staff": "冨田", "note": ""}, {"id": "t66", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-02-15", "lessonDate": "2026-02-22", "startTime": "11:00", "memberId": "2434", "name": "山木 歩", "gender": "女性", "age": 35, "joinMonth": null, "staff": "過去スタッフ", "note": ""}, {"id": "t67", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-02-15", "lessonDate": "2026-02-22", "startTime": "18:30", "memberId": "2435", "name": "山口 みらの", "gender": "女性", "age": 26, "joinMonth": 2, "staff": "桂", "note": ""}, {"id": "t68", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-02-17", "lessonDate": "2026-02-23", "startTime": "14:30", "memberId": "2439", "name": "山本 愛理", "gender": "女性", "age": 34, "joinMonth": 2, "staff": "過去スタッフ", "note": ""}, {"id": "t69", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-02-22", "lessonDate": "2026-02-24", "startTime": "20:00", "memberId": "2448", "name": "森井 陽子", "gender": "女性", "age": 48, "joinMonth": 2, "staff": "桂", "note": ""}, {"id": "t70", "store": "梅ヶ丘", "ticket": "無料体験チケット（２回目）", "applyDate": "2026-02-25", "lessonDate": "2026-02-26", "startTime": "10:30", "memberId": "2455", "name": "平岡 久美子", "gender": "女性", "age": 35, "joinMonth": null, "staff": "高橋", "note": ""}, {"id": "t71", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-02-24", "lessonDate": "2026-02-27", "startTime": "10:30", "memberId": "2453", "name": "大森 史子", "gender": "女性", "age": 67, "joinMonth": null, "staff": "古川", "note": ""}, {"id": "t72", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-02-21", "lessonDate": "2026-02-28", "startTime": "09:30", "memberId": "2447", "name": "松野 桃佳", "gender": "女性", "age": 25, "joinMonth": null, "staff": "過去スタッフ", "note": ""}, {"id": "t73", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-01-30", "lessonDate": "2026-02-01", "startTime": "12:30", "memberId": "2396", "name": "平田 香織", "gender": "女性", "age": 40, "joinMonth": 2, "staff": "服部", "note": ""}, {"id": "t74", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-01-29", "lessonDate": "2026-02-02", "startTime": "10:30", "memberId": "2379", "name": "森澤 まゆみ", "gender": "女性", "age": 62, "joinMonth": 2, "staff": "箱崎", "note": ""}, {"id": "t75", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-02-01", "lessonDate": "2026-02-03", "startTime": "10:30", "memberId": "2385", "name": "藤原 孝行", "gender": "男性", "age": 46, "joinMonth": 2, "staff": "角野", "note": ""}, {"id": "t76", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-02-02", "lessonDate": "2026-02-04", "startTime": "10:30", "memberId": "2405", "name": "奥野 賀代", "gender": "女性", "age": 61, "joinMonth": 2, "staff": "箱崎", "note": ""}, {"id": "t77", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-02-03", "lessonDate": "2026-02-06", "startTime": "12:30", "memberId": "2406", "name": "今村 優美華", "gender": "女性", "age": 34, "joinMonth": 2, "staff": "野呂", "note": ""}, {"id": "t78", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-02-05", "lessonDate": "2026-02-07", "startTime": "11:00", "memberId": "2410", "name": "高橋 佑奈", "gender": "女性", "age": 31, "joinMonth": 2, "staff": "過去スタッフ", "note": ""}, {"id": "t79", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-02-06", "lessonDate": "2026-02-07", "startTime": "17:00", "memberId": "2411", "name": "根本 佳織", "gender": "女性", "age": 47, "joinMonth": 2, "staff": "服部", "note": ""}, {"id": "t80", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-02-01", "lessonDate": "2026-02-08", "startTime": "17:30", "memberId": "2403", "name": "オウ カエイ", "gender": "女性", "age": 34, "joinMonth": null, "staff": "東山", "note": ""}, {"id": "t81", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-02-08", "lessonDate": "2026-02-10", "startTime": "16:30", "memberId": "2417", "name": "竹下 奈穂", "gender": "女性", "age": 27, "joinMonth": null, "staff": "服部", "note": ""}, {"id": "t82", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-02-09", "lessonDate": "2026-02-11", "startTime": "10:00", "memberId": "2419", "name": "稲垣 洋子", "gender": "女性", "age": 70, "joinMonth": 2, "staff": "服部", "note": ""}, {"id": "t83", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-02-11", "lessonDate": "2026-02-12", "startTime": "19:30", "memberId": "2408", "name": "濱井 今日香", "gender": "女性", "age": 27, "joinMonth": 2, "staff": "過去スタッフ", "note": ""}, {"id": "t84", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-02-14", "lessonDate": "2026-02-14", "startTime": "10:00", "memberId": "2429", "name": "畑 夏泉", "gender": "女性", "age": 27, "joinMonth": 2, "staff": "南雲", "note": ""}, {"id": "t85", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-02-11", "lessonDate": "2026-02-15", "startTime": "09:30", "memberId": "2425", "name": "小国 忠悦", "gender": "男性", "age": 48, "joinMonth": null, "staff": "東山", "note": ""}, {"id": "t86", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-02-10", "lessonDate": "2026-02-17", "startTime": "10:30", "memberId": "2418", "name": "松田 寿子", "gender": "女性", "age": 55, "joinMonth": 2, "staff": "過去スタッフ", "note": ""}, {"id": "t87", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-02-15", "lessonDate": "2026-02-18", "startTime": "11:00", "memberId": "2431", "name": "矢野 杏子", "gender": "女性", "age": 36, "joinMonth": 2, "staff": "過去スタッフ", "note": ""}, {"id": "t88", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-02-15", "lessonDate": "2026-02-18", "startTime": "12:30", "memberId": "2432", "name": "濱居 孝", "gender": "男性", "age": 53, "joinMonth": 2, "staff": "石田", "note": ""}, {"id": "t89", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-02-19", "lessonDate": "2026-02-20", "startTime": "10:30", "memberId": "2442", "name": "鈴木 大介", "gender": "男性", "age": 50, "joinMonth": 2, "staff": "過去スタッフ", "note": ""}, {"id": "t90", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-02-19", "lessonDate": "2026-02-20", "startTime": "12:00", "memberId": "2443", "name": "丹治 綾乃", "gender": "女性", "age": 47, "joinMonth": 2, "staff": "野呂", "note": ""}, {"id": "t91", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-02-17", "lessonDate": "2026-02-21", "startTime": "13:30", "memberId": "2438", "name": "篭橋 衛", "gender": "男性", "age": 28, "joinMonth": 2, "staff": "過去スタッフ", "note": ""}, {"id": "t92", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-02-18", "lessonDate": "2026-02-21", "startTime": "14:00", "memberId": "2437", "name": "高柿 智花", "gender": "女性", "age": 28, "joinMonth": 2, "staff": "過去スタッフ", "note": ""}, {"id": "t93", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-02-20", "lessonDate": "2026-02-23", "startTime": "13:00", "memberId": "2433", "name": "平川 峰子", "gender": "女性", "age": 49, "joinMonth": 2, "staff": "服部", "note": ""}, {"id": "t94", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-02-22", "lessonDate": "2026-02-23", "startTime": "17:00", "memberId": "2450", "name": "大瀧 美花子", "gender": "女性", "age": 30, "joinMonth": 2, "staff": "南雲", "note": ""}, {"id": "t95", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-02-22", "lessonDate": "2026-02-25", "startTime": "18:30", "memberId": "2449", "name": "宮下 学", "gender": "男性", "age": 57, "joinMonth": 2, "staff": "東山", "note": ""}, {"id": "t96", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-02-26", "lessonDate": "2026-02-26", "startTime": "17:30", "memberId": "2457", "name": "ヨナミネ ナオミ", "gender": "女性", "age": 53, "joinMonth": 2, "staff": "過去スタッフ", "note": ""}, {"id": "t97", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-02-25", "lessonDate": "2026-02-26", "startTime": "19:30", "memberId": "2454", "name": "前田 吉輝", "gender": "男性", "age": 32, "joinMonth": 2, "staff": "石田", "note": ""}, {"id": "t98", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-02-27", "lessonDate": "2026-02-27", "startTime": "20:00", "memberId": "2441", "name": "伊藤 有紀", "gender": "女性", "age": 49, "joinMonth": 2, "staff": "東山", "note": ""}, {"id": "t99", "store": "狛江", "ticket": "無料体験チケット", "applyDate": null, "lessonDate": "2026-02-28", "startTime": "19:00", "memberId": null, "name": "ワタナベ　タカコ", "gender": "女性", "age": null, "joinMonth": null, "staff": "服部", "note": ""}, {"id": "t100", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-03-01", "lessonDate": "2026-03-02", "startTime": "18:00", "memberId": "2459", "name": "松藤 小葵", "gender": "女性", "age": 33, "joinMonth": 3, "staff": "過去スタッフ", "note": ""}, {"id": "t101", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-03-03", "lessonDate": "2026-03-07", "startTime": "13:30", "memberId": "2460", "name": "清本 眞理", "gender": "女性", "age": 72, "joinMonth": 3, "staff": "過去スタッフ", "note": ""}, {"id": "t102", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-03-06", "lessonDate": "2026-03-07", "startTime": "16:30", "memberId": "2462", "name": "伊藤 正樹", "gender": "男性", "age": 45, "joinMonth": 4, "staff": "過去スタッフ", "note": ""}, {"id": "t103", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-02-23", "lessonDate": "2026-03-08", "startTime": "13:30", "memberId": "2452", "name": "渡辺 麻友", "gender": "女性", "age": 36, "joinMonth": 4, "staff": "過去スタッフ", "note": ""}, {"id": "t104", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-03-09", "lessonDate": "2026-03-12", "startTime": "11:00", "memberId": "2464", "name": "清水 尚美", "gender": "女性", "age": 50, "joinMonth": 3, "staff": "石田", "note": ""}, {"id": "t105", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-03-11", "lessonDate": "2026-03-13", "startTime": "19:00", "memberId": "2472", "name": "久保田 萌", "gender": "女性", "age": 28, "joinMonth": null, "staff": "桂", "note": ""}, {"id": "t106", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-03-06", "lessonDate": "2026-03-16", "startTime": "20:00", "memberId": "2465", "name": "山本 和子", "gender": "女性", "age": 55, "joinMonth": 5, "staff": "服部", "note": ""}, {"id": "t107", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-03-26", "lessonDate": "2026-03-27", "startTime": "13:30", "memberId": "2480", "name": "中西 謙之", "gender": "男性", "age": 56, "joinMonth": null, "staff": "山崎", "note": ""}, {"id": "t108", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-03-07", "lessonDate": "2026-03-07", "startTime": "13:30", "memberId": "2466", "name": "山本 由香利", "gender": "女性", "age": 49, "joinMonth": 3, "staff": "三浦", "note": ""}, {"id": "t109", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-03-04", "lessonDate": "2026-03-09", "startTime": "15:00", "memberId": "2461", "name": "志摩 竜司", "gender": "男性", "age": 54, "joinMonth": null, "staff": "服部", "note": ""}, {"id": "t110", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-03-12", "lessonDate": "2026-03-13", "startTime": "11:00", "memberId": "2473", "name": "川島 浩子", "gender": "女性", "age": 64, "joinMonth": 3, "staff": "野呂", "note": ""}, {"id": "t111", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-03-13", "lessonDate": "2026-03-14", "startTime": "11:30", "memberId": "2474", "name": "高橋 耕平", "gender": "男性", "age": 51, "joinMonth": null, "staff": "南雲", "note": ""}, {"id": "t112", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-03-09", "lessonDate": "2026-03-14", "startTime": "15:30", "memberId": "2468", "name": "黒澤 裕之", "gender": "男性", "age": 39, "joinMonth": 5, "staff": "服部", "note": ""}, {"id": "t113", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-03-13", "lessonDate": "2026-03-15", "startTime": "14:00", "memberId": "2470", "name": "高橋 千紘", "gender": "女性", "age": 45, "joinMonth": 3, "staff": "服部", "note": ""}, {"id": "t114", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-03-11", "lessonDate": "2026-03-15", "startTime": "18:00", "memberId": "2471", "name": "松浦 千華", "gender": "女性", "age": 36, "joinMonth": 3, "staff": "服部", "note": ""}, {"id": "t115", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-03-07", "lessonDate": "2026-03-21", "startTime": "11:00", "memberId": "2467", "name": "灰岡 克巳", "gender": "男性", "age": 67, "joinMonth": 3, "staff": "三浦", "note": ""}, {"id": "t116", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-03-21", "lessonDate": "2026-03-22", "startTime": "11:00", "memberId": "2476", "name": "齋藤 麻子", "gender": "女性", "age": 31, "joinMonth": null, "staff": "南雲", "note": ""}, {"id": "t117", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-03-26", "lessonDate": "2026-03-26", "startTime": "20:00", "memberId": "2479", "name": "早坂 佑美", "gender": "女性", "age": 33, "joinMonth": 4, "staff": "東山", "note": ""}, {"id": "t118", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-03-27", "lessonDate": "2026-03-27", "startTime": "15:30", "memberId": "2481", "name": "佐藤 美智子", "gender": "女性", "age": 43, "joinMonth": 3, "staff": "過去スタッフ", "note": ""}, {"id": "t119", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-03-27", "lessonDate": "2026-03-27", "startTime": "18:00", "memberId": "1100", "name": "横山 薫", "gender": "女性", "age": 52, "joinMonth": 3, "staff": "過去スタッフ", "note": ""}, {"id": "t120", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-03-28", "lessonDate": "2026-03-31", "startTime": "12:00", "memberId": "2483", "name": "前田 温子", "gender": "女性", "age": 37, "joinMonth": 4, "staff": "石田", "note": ""}, {"id": "t121", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-04-05", "lessonDate": "2026-04-05", "startTime": "18:30", "memberId": "2485", "name": "上村 汀", "gender": "女性", "age": 60, "joinMonth": 4, "staff": "桂", "note": ""}, {"id": "t122", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-04-14", "lessonDate": "2026-04-14", "startTime": "19:30", "memberId": "2488", "name": "稲富 ゆきな", "gender": "女性", "age": 19, "joinMonth": null, "staff": "冨田", "note": ""}, {"id": "t123", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-04-16", "lessonDate": "2026-04-16", "startTime": "18:00", "memberId": "2494", "name": "金子 永子", "gender": "女性", "age": 58, "joinMonth": null, "staff": "桂", "note": ""}, {"id": "t124", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-04-21", "lessonDate": "2026-04-22", "startTime": "17:30", "memberId": "2496", "name": "春日井 美帆", "gender": "女性", "age": 59, "joinMonth": 5, "staff": "服部", "note": ""}, {"id": "t125", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-04-23", "lessonDate": "2026-04-24", "startTime": "12:00", "memberId": "2500", "name": "田中 瞳", "gender": "女性", "age": 42, "joinMonth": null, "staff": "古川", "note": ""}, {"id": "t126", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-04-27", "lessonDate": "2026-04-28", "startTime": "11:00", "memberId": "2493", "name": "高橋 良実", "gender": "女性", "age": 35, "joinMonth": null, "staff": "高橋", "note": ""}, {"id": "t127", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-04-06", "lessonDate": "2026-04-06", "startTime": "13:00", "memberId": "2486", "name": "小川 典子", "gender": "女性", "age": 59, "joinMonth": 4, "staff": "東山", "note": ""}, {"id": "t128", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-04-03", "lessonDate": "2026-04-11", "startTime": "09:30", "memberId": "2484", "name": "田中 悠", "gender": "女性", "age": 28, "joinMonth": 4, "staff": "三浦", "note": ""}, {"id": "t129", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-04-12", "lessonDate": "2026-04-14", "startTime": "15:30", "memberId": "2489", "name": "所 涼平", "gender": "男性", "age": 37, "joinMonth": 4, "staff": "服部", "note": ""}, {"id": "t130", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-04-14", "lessonDate": "2026-04-20", "startTime": "15:00", "memberId": "2491", "name": "須藤 秀平", "gender": "男性", "age": 43, "joinMonth": null, "staff": "東山", "note": ""}, {"id": "t131", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-03-24", "lessonDate": "2026-04-21", "startTime": "19:30", "memberId": "2478", "name": "上田 祥太", "gender": "男性", "age": 37, "joinMonth": 5, "staff": "服部", "note": ""}, {"id": "t132", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-04-22", "lessonDate": "2026-04-22", "startTime": "18:30", "memberId": "2498", "name": "左古 陽大", "gender": "男性", "age": 19, "joinMonth": null, "staff": "桂", "note": ""}, {"id": "t133", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-04-21", "lessonDate": "2026-04-25", "startTime": "10:00", "memberId": "2497", "name": "長井 真梨菜", "gender": "女性", "age": 32, "joinMonth": 5, "staff": "南雲", "note": ""}, {"id": "t134", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-04-28", "lessonDate": "2026-04-30", "startTime": "19:30", "memberId": "2508", "name": "鈴木 晴香", "gender": "女性", "age": 34, "joinMonth": 5, "staff": "東山", "note": ""}, {"id": "t135", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-04-27", "lessonDate": "2026-05-02", "startTime": "10:00", "memberId": "2506", "name": "浅川 雄太", "gender": "男性", "age": 45, "joinMonth": 5, "staff": "服部", "note": ""}, {"id": "t136", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-04-26", "lessonDate": "2026-05-03", "startTime": "10:00", "memberId": "2503", "name": "森本 令子", "gender": "女性", "age": 46, "joinMonth": 5, "staff": "高橋", "note": ""}, {"id": "t137", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-04-27", "lessonDate": "2026-05-03", "startTime": "11:30", "memberId": "2507", "name": "遠藤 悠倫", "gender": "女性", "age": 26, "joinMonth": 5, "staff": "高橋", "note": ""}, {"id": "t138", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-04-30", "lessonDate": "2026-05-04", "startTime": "19:00", "memberId": "2512", "name": "矢代 順子", "gender": "女性", "age": 66, "joinMonth": 5, "staff": "冨田", "note": ""}, {"id": "t139", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-05-07", "lessonDate": "2026-05-07", "startTime": "15:30", "memberId": "2522", "name": "千代田 明子", "gender": "女性", "age": 50, "joinMonth": 5, "staff": "山崎", "note": ""}, {"id": "t140", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-05-06", "lessonDate": "2026-05-09", "startTime": "15:00", "memberId": "2520", "name": "中谷 有沙", "gender": "女性", "age": 27, "joinMonth": 5, "staff": "冨田", "note": ""}, {"id": "t141", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-05-09", "lessonDate": "2026-05-09", "startTime": "18:30", "memberId": "2526", "name": "大村 真基", "gender": "男性", "age": 58, "joinMonth": 5, "staff": "冨田", "note": ""}, {"id": "t142", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-05-09", "lessonDate": "2026-05-10", "startTime": "17:30", "memberId": "2528", "name": "瀧沢 文子", "gender": "女性", "age": 49, "joinMonth": null, "staff": "冨田", "note": ""}, {"id": "t143", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-05-10", "lessonDate": "2026-05-12", "startTime": "19:00", "memberId": "2530", "name": "福井 花菜", "gender": "女性", "age": 43, "joinMonth": 5, "staff": "冨田", "note": ""}, {"id": "t144", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-05-10", "lessonDate": "2026-05-12", "startTime": "19:00", "memberId": "2533", "name": "福井 雄一郎", "gender": "男性", "age": 44, "joinMonth": 5, "staff": "冨田", "note": ""}, {"id": "t145", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-05-11", "lessonDate": "2026-05-13", "startTime": "12:00", "memberId": "2531", "name": "小笠原 裕子", "gender": "女性", "age": 41, "joinMonth": 5, "staff": "古川", "note": ""}, {"id": "t146", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-05-14", "lessonDate": "2026-05-14", "startTime": "14:00", "memberId": "2534", "name": "山田 奈緒子", "gender": "女性", "age": 25, "joinMonth": null, "staff": "山崎", "note": ""}, {"id": "t147", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-05-18", "lessonDate": "2026-05-20", "startTime": "18:30", "memberId": "128", "name": "要田 結", "gender": "女性", "age": 22, "joinMonth": 5, "staff": "再入会", "note": ""}, {"id": "t148", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-05-18", "lessonDate": "2026-05-23", "startTime": "09:30", "memberId": "2537", "name": "平野 藍", "gender": "女性", "age": 46, "joinMonth": 5, "staff": "三浦", "note": ""}, {"id": "t149", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-05-21", "lessonDate": "2026-05-23", "startTime": "11:00", "memberId": "2539", "name": "小池 夏実", "gender": "女性", "age": 20, "joinMonth": 5, "staff": "三浦", "note": ""}, {"id": "t150", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-05-23", "lessonDate": "2026-05-24", "startTime": "19:00", "memberId": "2543", "name": "井上 伸一郎", "gender": "男性", "age": 31, "joinMonth": null, "staff": "服部", "note": ""}, {"id": "t151", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-05-25", "lessonDate": "2026-05-25", "startTime": "17:30", "memberId": "2545", "name": "岡部 佐織", "gender": "女性", "age": 41, "joinMonth": null, "staff": "桂", "note": ""}, {"id": "t152", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-04-26", "lessonDate": "2026-05-02", "startTime": "11:30", "memberId": "2502", "name": "最所 路子", "gender": "女性", "age": 47, "joinMonth": 5, "staff": "南雲", "note": ""}, {"id": "t153", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-04-30", "lessonDate": "2026-05-02", "startTime": "19:00", "memberId": "2513", "name": "高坂 一彦", "gender": "男性", "age": 55, "joinMonth": 5, "staff": "浅見", "note": ""}, {"id": "t154", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-04-28", "lessonDate": "2026-05-03", "startTime": "09:30", "memberId": "2509", "name": "舌津 成美", "gender": "女性", "age": 32, "joinMonth": 5, "staff": "服部", "note": ""}, {"id": "t155", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-05-03", "lessonDate": "2026-05-03", "startTime": "09:30", "memberId": "2515", "name": "舌津 勇希", "gender": "男性", "age": 46, "joinMonth": 5, "staff": "服部", "note": ""}, {"id": "t156", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-05-03", "lessonDate": "2026-05-04", "startTime": "17:30", "memberId": "2516", "name": "川嶋 みらい", "gender": "女性", "age": 28, "joinMonth": 5, "staff": "浅見", "note": ""}, {"id": "t157", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-05-05", "lessonDate": "2026-05-05", "startTime": "14:00", "memberId": "2517", "name": "田原 尚子", "gender": "女性", "age": 58, "joinMonth": 5, "staff": "服部", "note": ""}, {"id": "t158", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-04-27", "lessonDate": "2026-05-06", "startTime": "10:30", "memberId": "2504", "name": "浜崎 真貴子", "gender": "女性", "age": 38, "joinMonth": 5, "staff": "服部", "note": ""}, {"id": "t159", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-05-02", "lessonDate": "2026-05-07", "startTime": "11:00", "memberId": "2514", "name": "打越 緑", "gender": "女性", "age": 50, "joinMonth": 5, "staff": "浅見", "note": ""}, {"id": "t160", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-05-06", "lessonDate": "2026-05-07", "startTime": "12:30", "memberId": "2521", "name": "倉橋 輝", "gender": "男性", "age": 37, "joinMonth": 5, "staff": "浅見", "note": ""}, {"id": "t161", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-05-05", "lessonDate": "2026-05-09", "startTime": "10:30", "memberId": "2518", "name": "有田 麻子", "gender": "女性", "age": 42, "joinMonth": 5, "staff": "服部", "note": ""}, {"id": "t162", "store": "", "ticket": "", "applyDate": null, "lessonDate": null, "startTime": null, "memberId": "2524", "name": "瀧山 奏", "gender": "女性", "age": 19, "joinMonth": null, "staff": "", "note": "来店不明"}, {"id": "t163", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-05-07", "lessonDate": "2026-05-10", "startTime": "11:00", "memberId": "2499", "name": "藤崎 みゆき", "gender": "女性", "age": 67, "joinMonth": 5, "staff": "南雲", "note": ""}, {"id": "t164", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-05-10", "lessonDate": "2026-05-11", "startTime": "11:00", "memberId": "2529", "name": "宮田 那千子", "gender": "女性", "age": 31, "joinMonth": 5, "staff": "野呂", "note": ""}, {"id": "t165", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-04-25", "lessonDate": "2026-05-12", "startTime": "11:00", "memberId": "2501", "name": "小室 遥", "gender": "女性", "age": 32, "joinMonth": 5, "staff": "箱崎", "note": ""}, {"id": "t166", "store": "", "ticket": "", "applyDate": null, "lessonDate": null, "startTime": null, "memberId": null, "name": "宮内 晴香", "gender": "女性", "age": 33, "joinMonth": null, "staff": "", "note": "入会意思なし未カウント"}, {"id": "t167", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-05-14", "lessonDate": "2026-05-15", "startTime": "11:30", "memberId": "2535", "name": "石住 理恵", "gender": "女性", "age": 34, "joinMonth": 5, "staff": "野呂", "note": ""}, {"id": "t168", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-05-09", "lessonDate": "2026-05-16", "startTime": "11:00", "memberId": "2525", "name": "入江 寿栄", "gender": "男性", "age": 42, "joinMonth": 5, "staff": "服部", "note": ""}, {"id": "t169", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-05-27", "lessonDate": "2026-05-16", "startTime": "11:00", "memberId": "2527", "name": "山下 紗貴", "gender": "女性", "age": 29, "joinMonth": 5, "staff": "服部", "note": ""}, {"id": "t170", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-05-16", "lessonDate": "2026-05-17", "startTime": "09:30", "memberId": "2536", "name": "安達 優太", "gender": "男性", "age": 42, "joinMonth": 6, "staff": "南雲", "note": ""}, {"id": "t171", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-05-18", "lessonDate": "2026-05-19", "startTime": "11:00", "memberId": "2538", "name": "星 海月", "gender": "女性", "age": 25, "joinMonth": 5, "staff": "箱崎", "note": ""}, {"id": "t172", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-05-21", "lessonDate": "2026-05-22", "startTime": "11:00", "memberId": "1442", "name": "加藤 祐子", "gender": "女性", "age": 60, "joinMonth": 5, "staff": "再入会", "note": ""}, {"id": "t173", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-05-21", "lessonDate": "2026-05-22", "startTime": "12:30", "memberId": "2540", "name": "澄川 美佐", "gender": "女性", "age": 54, "joinMonth": 5, "staff": "野呂", "note": ""}, {"id": "t174", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-05-24", "lessonDate": "2026-05-26", "startTime": "10:30", "memberId": "2544", "name": "杉浦 裕大", "gender": "男性", "age": 25, "joinMonth": 5, "staff": "黒澤", "note": ""}, {"id": "t175", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-05-26", "lessonDate": "2026-05-30", "startTime": "17:30", "memberId": "2546", "name": "白石 明生", "gender": "男性", "age": 53, "joinMonth": 5, "staff": "桂", "note": ""}, {"id": "t176", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-05-29", "lessonDate": "2026-05-30", "startTime": "19:00", "memberId": "2547", "name": "鳥井 茜", "gender": "女性", "age": 37, "joinMonth": 5, "staff": "桂", "note": ""}, {"id": "t177", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-06-04", "lessonDate": "2026-06-05", "startTime": "13:30", "memberId": "2553", "name": "飯田 百恵", "gender": "女性", "age": 51, "joinMonth": 6, "staff": "古川", "note": ""}, {"id": "t178", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-06-05", "lessonDate": "2026-06-06", "startTime": "11:00", "memberId": "2554", "name": "唐田 綾子", "gender": "女性", "age": 30, "joinMonth": null, "staff": "浅見", "note": ""}, {"id": "t179", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-06-03", "lessonDate": "2026-06-06", "startTime": "14:00", "memberId": "2550", "name": "矢部 紗耶香", "gender": "女性", "age": 40, "joinMonth": 6, "staff": "三浦", "note": ""}, {"id": "t180", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-06-05", "lessonDate": "2026-06-06", "startTime": "17:00", "memberId": "2555", "name": "池戸 颯", "gender": "男性", "age": 24, "joinMonth": 6, "staff": "服部", "note": ""}, {"id": "t181", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-06-01", "lessonDate": "2026-06-07", "startTime": "17:00", "memberId": "2549", "name": "山本 裕太", "gender": "男性", "age": 34, "joinMonth": 6, "staff": "服部", "note": ""}, {"id": "t182", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-06-07", "lessonDate": "2026-06-07", "startTime": "16:00", "memberId": "2557", "name": "永田 裕子", "gender": "女性", "age": 34, "joinMonth": 6, "staff": "冨田", "note": ""}, {"id": "t183", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-06-04", "lessonDate": "2026-06-10", "startTime": "18:00", "memberId": "2552", "name": "三宅 貴之", "gender": "男性", "age": 51, "joinMonth": 6, "staff": "冨田", "note": ""}, {"id": "t184", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-06-06", "lessonDate": "2026-06-08", "startTime": "14:00", "memberId": "2556", "name": "上村 美帆", "gender": "女性", "age": 33, "joinMonth": 6, "staff": "山崎", "note": ""}, {"id": "t185", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-06-08", "lessonDate": "2026-06-08", "startTime": "18:00", "memberId": "251", "name": "小池 恵子", "gender": "女性", "age": 57, "joinMonth": 6, "staff": "再入会", "note": ""}, {"id": "t186", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-06-08", "lessonDate": "2026-06-13", "startTime": "09:30", "memberId": "2560", "name": "佐々木 慧", "gender": "男性", "age": 40, "joinMonth": 6, "staff": "浅見", "note": ""}, {"id": "t187", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-06-03", "lessonDate": "2026-06-13", "startTime": "12:30", "memberId": "2551", "name": "西浦 淳一", "gender": "男性", "age": 61, "joinMonth": 6, "staff": "服部", "note": ""}, {"id": "t188", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-06-03", "lessonDate": "2026-06-13", "startTime": "12:30", "memberId": "2566", "name": "西浦 美樹", "gender": "女性", "age": 58, "joinMonth": 6, "staff": "服部", "note": ""}, {"id": "t189", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-06-09", "lessonDate": "2026-06-15", "startTime": "18:00", "memberId": "2561", "name": "菅原 絵梨", "gender": "女性", "age": 38, "joinMonth": 6, "staff": "桂", "note": ""}, {"id": "t190", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-06-15", "lessonDate": "2026-06-16", "startTime": "14:00", "memberId": "2568", "name": "山川 絵美", "gender": "女性", "age": 42, "joinMonth": 6, "staff": "三浦", "note": ""}, {"id": "t191", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-06-17", "lessonDate": "2026-06-17", "startTime": "18:00", "memberId": "2564", "name": "前田 佳宏", "gender": "男性", "age": 37, "joinMonth": 6, "staff": "服部", "note": ""}, {"id": "t192", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-06-12", "lessonDate": "2026-06-20", "startTime": "11:00", "memberId": "2562", "name": "千葉 菜穂子", "gender": "女性", "age": 53, "joinMonth": 6, "staff": "南雲", "note": ""}, {"id": "t193", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-06-21", "lessonDate": "2026-06-22", "startTime": "12:00", "memberId": "2569", "name": "佐藤 花織", "gender": "女性", "age": 47, "joinMonth": 6, "staff": "黒澤", "note": ""}, {"id": "t194", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-06-14", "lessonDate": "2026-06-22", "startTime": "14:00", "memberId": "2567", "name": "栗山 真帆", "gender": "女性", "age": 29, "joinMonth": 6, "staff": "黒澤", "note": ""}, {"id": "t195", "store": "梅ヶ丘", "ticket": "無料体験チケット", "applyDate": "2026-06-24", "lessonDate": "2026-06-24", "startTime": "14:00", "memberId": "2572", "name": "田中 暁子", "gender": "女性", "age": 50, "joinMonth": 6, "staff": "古川", "note": ""}, {"id": "t196", "store": "狛江", "ticket": "無料体験チケット", "applyDate": "2026-06-25", "lessonDate": "2026-06-26", "startTime": "12:30", "memberId": "2573", "name": "加藤 千晴", "gender": "女性", "age": 27, "joinMonth": 6, "staff": "野呂", "note": ""}], "joins": [{"memberId": "2346", "year": 2026, "month": 1}, {"memberId": "2347", "year": 2026, "month": 1}, {"memberId": "2352", "year": 2026, "month": 1}, {"memberId": "2360", "year": 2026, "month": 1}, {"memberId": "2368", "year": 2026, "month": 1}, {"memberId": "2369", "year": 2026, "month": 1}, {"memberId": "2371", "year": 2026, "month": 1}, {"memberId": "2375", "year": 2026, "month": 1}, {"memberId": "2388", "year": 2026, "month": 1}, {"memberId": "2341", "year": 2026, "month": 1}, {"memberId": "2342", "year": 2026, "month": 1}, {"memberId": "2345", "year": 2026, "month": 1}, {"memberId": "2349", "year": 2026, "month": 1}, {"memberId": "2351", "year": 2026, "month": 1}, {"memberId": "2353", "year": 2026, "month": 1}, {"memberId": "2354", "year": 2026, "month": 1}, {"memberId": "2355", "year": 2026, "month": 1}, {"memberId": "2356", "year": 2026, "month": 1}, {"memberId": "2357", "year": 2026, "month": 1}, {"memberId": "2358", "year": 2026, "month": 1}, {"memberId": "2361", "year": 2026, "month": 1}, {"memberId": "2362", "year": 2026, "month": 1}, {"memberId": "2363", "year": 2026, "month": 1}, {"memberId": "2364", "year": 2026, "month": 1}, {"memberId": "2378", "year": 2026, "month": 1}, {"memberId": "2093", "year": 2026, "month": 2}, {"memberId": "2348", "year": 2026, "month": 2}, {"memberId": "2373", "year": 2026, "month": 2}, {"memberId": "2374", "year": 2026, "month": 2}, {"memberId": "2380", "year": 2026, "month": 2}, {"memberId": "2382", "year": 2026, "month": 2}, {"memberId": "2394", "year": 2026, "month": 2}, {"memberId": "2395", "year": 2026, "month": 2}, {"memberId": "2397", "year": 2026, "month": 2}, {"memberId": "2398", "year": 2026, "month": 2}, {"memberId": "2399", "year": 2026, "month": 2}, {"memberId": "2400", "year": 2026, "month": 2}, {"memberId": "2401", "year": 2026, "month": 2}, {"memberId": "2404", "year": 2026, "month": 2}, {"memberId": "2407", "year": 2026, "month": 2}, {"memberId": "2411", "year": 2026, "month": 2}, {"memberId": "2412", "year": 2026, "month": 2}, {"memberId": "2413", "year": 2026, "month": 2}, {"memberId": "2415", "year": 2026, "month": 2}, {"memberId": "2416", "year": 2026, "month": 2}, {"memberId": "2420", "year": 2026, "month": 2}, {"memberId": "2426", "year": 2026, "month": 2}, {"memberId": "2430", "year": 2026, "month": 2}, {"memberId": "2435", "year": 2026, "month": 2}, {"memberId": "2436", "year": 2026, "month": 2}, {"memberId": "2439", "year": 2026, "month": 2}, {"memberId": "2446", "year": 2026, "month": 2}, {"memberId": "2448", "year": 2026, "month": 2}, {"memberId": "2190", "year": 2026, "month": 2}, {"memberId": "2359", "year": 2026, "month": 2}, {"memberId": "2372", "year": 2026, "month": 2}, {"memberId": "2377", "year": 2026, "month": 2}, {"memberId": "2379", "year": 2026, "month": 2}, {"memberId": "2381", "year": 2026, "month": 2}, {"memberId": "2385", "year": 2026, "month": 2}, {"memberId": "2386", "year": 2026, "month": 2}, {"memberId": "2387", "year": 2026, "month": 2}, {"memberId": "2390", "year": 2026, "month": 2}, {"memberId": "2391", "year": 2026, "month": 2}, {"memberId": "2396", "year": 2026, "month": 2}, {"memberId": "2405", "year": 2026, "month": 2}, {"memberId": "2406", "year": 2026, "month": 2}, {"memberId": "2408", "year": 2026, "month": 2}, {"memberId": "2410", "year": 2026, "month": 2}, {"memberId": "2418", "year": 2026, "month": 2}, {"memberId": "2419", "year": 2026, "month": 2}, {"memberId": "2422", "year": 2026, "month": 2}, {"memberId": "2424", "year": 2026, "month": 2}, {"memberId": "2429", "year": 2026, "month": 2}, {"memberId": "2431", "year": 2026, "month": 2}, {"memberId": "2432", "year": 2026, "month": 2}, {"memberId": "2433", "year": 2026, "month": 2}, {"memberId": "2437", "year": 2026, "month": 2}, {"memberId": "2438", "year": 2026, "month": 2}, {"memberId": "2441", "year": 2026, "month": 2}, {"memberId": "2442", "year": 2026, "month": 2}, {"memberId": "2443", "year": 2026, "month": 2}, {"memberId": "2449", "year": 2026, "month": 2}, {"memberId": "2450", "year": 2026, "month": 2}, {"memberId": "2454", "year": 2026, "month": 2}, {"memberId": "2457", "year": 2026, "month": 2}, {"memberId": "2459", "year": 2026, "month": 3}, {"memberId": "2460", "year": 2026, "month": 3}, {"memberId": "2464", "year": 2026, "month": 3}, {"memberId": "2470", "year": 2026, "month": 3}, {"memberId": "1100", "year": 2026, "month": 3}, {"memberId": "2466", "year": 2026, "month": 3}, {"memberId": "2467", "year": 2026, "month": 3}, {"memberId": "2471", "year": 2026, "month": 3}, {"memberId": "2473", "year": 2026, "month": 3}, {"memberId": "2481", "year": 2026, "month": 3}, {"memberId": "45", "year": 2026, "month": 3}, {"memberId": "2452", "year": 2026, "month": 4}, {"memberId": "2485", "year": 2026, "month": 4}, {"memberId": "2462", "year": 2026, "month": 4}, {"memberId": "2479", "year": 2026, "month": 4}, {"memberId": "2483", "year": 2026, "month": 4}, {"memberId": "2484", "year": 2026, "month": 4}, {"memberId": "2486", "year": 2026, "month": 4}, {"memberId": "2489", "year": 2026, "month": 4}, {"memberId": "128", "year": 2026, "month": 5}, {"memberId": "2465", "year": 2026, "month": 5}, {"memberId": "2496", "year": 2026, "month": 5}, {"memberId": "2503", "year": 2026, "month": 5}, {"memberId": "2506", "year": 2026, "month": 5}, {"memberId": "2507", "year": 2026, "month": 5}, {"memberId": "2512", "year": 2026, "month": 5}, {"memberId": "2520", "year": 2026, "month": 5}, {"memberId": "2522", "year": 2026, "month": 5}, {"memberId": "2526", "year": 2026, "month": 5}, {"memberId": "2530", "year": 2026, "month": 5}, {"memberId": "2531", "year": 2026, "month": 5}, {"memberId": "2533", "year": 2026, "month": 5}, {"memberId": "2537", "year": 2026, "month": 5}, {"memberId": "2539", "year": 2026, "month": 5}, {"memberId": "2468", "year": 2026, "month": 5}, {"memberId": "2478", "year": 2026, "month": 5}, {"memberId": "2497", "year": 2026, "month": 5}, {"memberId": "2499", "year": 2026, "month": 5}, {"memberId": "2501", "year": 2026, "month": 5}, {"memberId": "2502", "year": 2026, "month": 5}, {"memberId": "2504", "year": 2026, "month": 5}, {"memberId": "2508", "year": 2026, "month": 5}, {"memberId": "2509", "year": 2026, "month": 5}, {"memberId": "2513", "year": 2026, "month": 5}, {"memberId": "2514", "year": 2026, "month": 5}, {"memberId": "2515", "year": 2026, "month": 5}, {"memberId": "2516", "year": 2026, "month": 5}, {"memberId": "2517", "year": 2026, "month": 5}, {"memberId": "2518", "year": 2026, "month": 5}, {"memberId": "2521", "year": 2026, "month": 5}, {"memberId": "2525", "year": 2026, "month": 5}, {"memberId": "2527", "year": 2026, "month": 5}, {"memberId": "2529", "year": 2026, "month": 5}, {"memberId": "2535", "year": 2026, "month": 5}, {"memberId": "2538", "year": 2026, "month": 5}, {"memberId": "2540", "year": 2026, "month": 5}, {"memberId": "2544", "year": 2026, "month": 5}, {"memberId": "2547", "year": 2026, "month": 5}, {"memberId": "2546", "year": 2026, "month": 5}, {"memberId": "1442", "year": 2026, "month": 5}, {"memberId": "2553", "year": 2026, "month": 6}, {"memberId": "2536", "year": 2026, "month": 6}, {"memberId": "2550", "year": 2026, "month": 6}, {"memberId": "2555", "year": 2026, "month": 6}, {"memberId": "2549", "year": 2026, "month": 6}, {"memberId": "2557", "year": 2026, "month": 6}, {"memberId": "2556", "year": 2026, "month": 6}, {"memberId": "2552", "year": 2026, "month": 6}, {"memberId": "251", "year": 2026, "month": 6}, {"memberId": "2551", "year": 2026, "month": 6}, {"memberId": "2560", "year": 2026, "month": 6}, {"memberId": "2566", "year": 2026, "month": 6}, {"memberId": "2561", "year": 2026, "month": 6}, {"memberId": "2568", "year": 2026, "month": 6}, {"memberId": "2564", "year": 2026, "month": 6}, {"memberId": "2562", "year": 2026, "month": 6}, {"memberId": "2569", "year": 2026, "month": 6}, {"memberId": "2567", "year": 2026, "month": 6}, {"memberId": "2573", "year": 2026, "month": 6}, {"memberId": "2572", "year": 2026, "month": 6}], "memberMonthly": [{"store": "梅ヶ丘", "year": 2026, "month": 1, "total": 319, "onHold": 9, "joinsTotal": 9, "leaves": 20}, {"store": "梅ヶ丘", "year": 2026, "month": 2, "total": 327, "onHold": 5, "joinsTotal": 28, "leaves": 20}, {"store": "梅ヶ丘", "year": 2026, "month": 3, "total": 311, "onHold": 5, "joinsTotal": 4, "leaves": 12}, {"store": "狛江", "year": 2026, "month": 1, "total": 320, "onHold": 16, "joinsTotal": 16, "leaves": 21}, {"store": "狛江", "year": 2026, "month": 2, "total": 334, "onHold": 18, "joinsTotal": 33, "leaves": 19}, {"store": "狛江", "year": 2026, "month": 3, "total": 321, "onHold": 9, "joinsTotal": 6, "leaves": 14}, {"store": "梅ヶ丘", "year": 2026, "month": 4, "total": 301, "onHold": 5, "joinsTotal": 2, "leaves": 14}, {"store": "梅ヶ丘", "year": 2026, "month": 5, "total": 303, "onHold": 8, "joinsTotal": 14, "leaves": 12}, {"store": "梅ヶ丘", "year": 2026, "month": 6, "total": 300, "onHold": 6, "joinsTotal": 8, "leaves": 13}, {"store": "狛江", "year": 2026, "month": 4, "total": 313, "onHold": 5, "joinsTotal": 6, "leaves": 14}, {"store": "狛江", "year": 2026, "month": 5, "total": 325, "onHold": 5, "joinsTotal": 25, "leaves": 31}, {"store": "狛江", "year": 2026, "month": 6, "total": 307, "onHold": 4, "joinsTotal": 13, "leaves": 21}, {"store": "梅ヶ丘", "year": 2026, "month": 7, "total": 288, "onHold": 5, "joinsTotal": 1, "leaves": 2}, {"store": "狛江", "year": 2026, "month": 7, "total": 288, "onHold": 6, "joinsTotal": 2, "leaves": 4}, {"store": "梅ヶ丘", "year": 2025, "month": 1, "total": 305, "onHold": 9, "joinsTotal": 17, "leaves": 21}, {"store": "梅ヶ丘", "year": 2025, "month": 2, "total": 307, "onHold": 14, "joinsTotal": 22, "leaves": 14}, {"store": "梅ヶ丘", "year": 2025, "month": 3, "total": 299, "onHold": 12, "joinsTotal": 6, "leaves": 10}, {"store": "狛江", "year": 2025, "month": 1, "total": 233, "onHold": 10, "joinsTotal": 16, "leaves": 11}, {"store": "狛江", "year": 2025, "month": 2, "total": 253, "onHold": 11, "joinsTotal": 31, "leaves": 13}, {"store": "狛江", "year": 2025, "month": 3, "total": 250, "onHold": 13, "joinsTotal": 9, "leaves": 8}, {"store": "梅ヶ丘", "year": 2025, "month": 4, "total": 298, "onHold": 9, "joinsTotal": 8, "leaves": 14}, {"store": "梅ヶ丘", "year": 2025, "month": 5, "total": 303, "onHold": 9, "joinsTotal": 19, "leaves": 11}, {"store": "梅ヶ丘", "year": 2025, "month": 6, "total": 309, "onHold": 7, "joinsTotal": 17, "leaves": 12}, {"store": "狛江", "year": 2025, "month": 4, "total": 262, "onHold": 10, "joinsTotal": 20, "leaves": 12}, {"store": "狛江", "year": 2025, "month": 5, "total": 274, "onHold": 12, "joinsTotal": 24, "leaves": 18}, {"store": "狛江", "year": 2025, "month": 6, "total": 280, "onHold": 12, "joinsTotal": 23, "leaves": 22}, {"store": "梅ヶ丘", "year": 2025, "month": 7, "total": 317, "onHold": 9, "joinsTotal": 19, "leaves": 8}, {"store": "梅ヶ丘", "year": 2025, "month": 8, "total": 325, "onHold": 17, "joinsTotal": 17, "leaves": 11}, {"store": "梅ヶ丘", "year": 2025, "month": 9, "total": 338, "onHold": 12, "joinsTotal": 23, "leaves": 14}, {"store": "狛江", "year": 2025, "month": 7, "total": 289, "onHold": 14, "joinsTotal": 31, "leaves": 20}, {"store": "狛江", "year": 2025, "month": 8, "total": 293, "onHold": 23, "joinsTotal": 23, "leaves": 12}, {"store": "狛江", "year": 2025, "month": 9, "total": 300, "onHold": 19, "joinsTotal": 19, "leaves": 13}, {"store": "梅ヶ丘", "year": 2025, "month": 10, "total": 331, "onHold": 11, "joinsTotal": 7, "leaves": 12}, {"store": "梅ヶ丘", "year": 2025, "month": 11, "total": 330, "onHold": 8, "joinsTotal": 11, "leaves": 12}, {"store": "梅ヶ丘", "year": 2025, "month": 12, "total": 327, "onHold": 10, "joinsTotal": 9, "leaves": 18}, {"store": "狛江", "year": 2025, "month": 10, "total": 306, "onHold": 16, "joinsTotal": 19, "leaves": 13}, {"store": "狛江", "year": 2025, "month": 11, "total": 321, "onHold": 15, "joinsTotal": 28, "leaves": 17}, {"store": "狛江", "year": 2025, "month": 12, "total": 320, "onHold": 16, "joinsTotal": 15, "leaves": 16}], "baselines": {"梅ヶ丘": {"year": 2024, "month": 12, "total": 300}, "狛江": {"year": 2024, "month": 12, "total": 234}}, "budgetTargets": [{"store": "梅ヶ丘", "year": 2026, "month": 1, "revenue": 2483408, "members": 358, "joins": 17, "leaves": 16}, {"store": "梅ヶ丘", "year": 2026, "month": 2, "revenue": 2484701, "members": 353, "joins": 10, "leaves": 15}, {"store": "梅ヶ丘", "year": 2026, "month": 3, "revenue": 2497522, "members": 349, "joins": 10, "leaves": 14}, {"store": "梅ヶ丘", "year": 2026, "month": 4, "revenue": 2511963, "members": 323, "joins": 12, "leaves": 8}, {"store": "梅ヶ丘", "year": 2026, "month": 5, "revenue": 2573359, "members": 327, "joins": 18, "leaves": 8}, {"store": "梅ヶ丘", "year": 2026, "month": 6, "revenue": 2779478, "members": 337, "joins": 20, "leaves": 8}, {"store": "梅ヶ丘", "year": 2026, "month": 7, "revenue": 2698935, "members": 349, "joins": 10, "leaves": 9}, {"store": "梅ヶ丘", "year": 2026, "month": 8, "revenue": 2673878, "members": 350, "joins": 8, "leaves": 9}, {"store": "梅ヶ丘", "year": 2026, "month": 9, "revenue": 2894055, "members": 349, "joins": 22, "leaves": 9}, {"store": "梅ヶ丘", "year": 2026, "month": 10, "revenue": 2828434, "members": 362, "joins": 12, "leaves": 9}, {"store": "梅ヶ丘", "year": 2026, "month": 11, "revenue": 2818293, "members": 365, "joins": 10, "leaves": 9}, {"store": "梅ヶ丘", "year": 2026, "month": 12, "revenue": 2703715, "members": 366, "joins": 8, "leaves": 21}, {"store": "狛江", "year": 2026, "month": 1, "revenue": 2031613, "members": 321, "joins": 21, "leaves": 15}, {"store": "狛江", "year": 2026, "month": 2, "revenue": 2009621, "members": 324, "joins": 15, "leaves": 12}, {"store": "狛江", "year": 2026, "month": 3, "revenue": 2086429, "members": 331, "joins": 15, "leaves": 8}, {"store": "狛江", "year": 2026, "month": 4, "revenue": 2140225, "members": 330, "joins": 18, "leaves": 12}, {"store": "狛江", "year": 2026, "month": 5, "revenue": 2120233, "members": 336, "joins": 25, "leaves": 12}, {"store": "狛江", "year": 2026, "month": 6, "revenue": 2334628, "members": 349, "joins": 25, "leaves": 12}, {"store": "狛江", "year": 2026, "month": 7, "revenue": 2253036, "members": 362, "joins": 15, "leaves": 13}, {"store": "狛江", "year": 2026, "month": 8, "revenue": 2226636, "members": 364, "joins": 12, "leaves": 13}, {"store": "狛江", "year": 2026, "month": 9, "revenue": 2455524, "members": 363, "joins": 30, "leaves": 13}, {"store": "狛江", "year": 2026, "month": 10, "revenue": 2323524, "members": 380, "joins": 15, "leaves": 13}, {"store": "狛江", "year": 2026, "month": 11, "revenue": 2354796, "members": 382, "joins": 12, "leaves": 13}, {"store": "狛江", "year": 2026, "month": 12, "revenue": 2313187, "members": 381, "joins": 8, "leaves": 42}], "revenueActuals": [{"store": "梅ヶ丘", "year": 2026, "month": 1, "amount": 2667940}, {"store": "梅ヶ丘", "year": 2026, "month": 2, "amount": 2511200}, {"store": "梅ヶ丘", "year": 2026, "month": 3, "amount": 2585078}, {"store": "梅ヶ丘", "year": 2026, "month": 4, "amount": 2391178}, {"store": "梅ヶ丘", "year": 2026, "month": 5, "amount": 2369390}, {"store": "梅ヶ丘", "year": 2026, "month": 6, "amount": 2340690}, {"store": "狛江", "year": 2026, "month": 1, "amount": 2449710}, {"store": "狛江", "year": 2026, "month": 2, "amount": 2444020}, {"store": "狛江", "year": 2026, "month": 3, "amount": 2631210}, {"store": "狛江", "year": 2026, "month": 4, "amount": 2597628}, {"store": "狛江", "year": 2026, "month": 5, "amount": 2427230}, {"store": "狛江", "year": 2026, "month": 6, "amount": 2398590}], "settings": {"targetCvrPct": 0.89, "churnThresholdPct": 0.03, "stores": [{"key": "梅ヶ丘", "full": "4H fitness 梅ヶ丘", "color": "#7A5285", "meaning": "梅ヶ丘＝plum hill"}, {"key": "狛江", "full": "4H fitness 狛江", "color": "#3A5A78", "meaning": "狛江＝river town"}]}}

// ============================================================
// 計算エンジン（純粋関数）
// ============================================================
const STORE_DEFS = SEED_DATA.settings.stores;
const STORE_KEYS = STORE_DEFS.map((s) => s.key);
const STORE_COLOR = Object.fromEntries(STORE_DEFS.map((s) => [s.key, s.color]));

function matchStoreName(raw) {
  const s = raw || "";
  for (const sd of STORE_DEFS) if (s.includes(sd.key)) return sd.key;
  return "";
}
const EXCLUDED_STAFF = "入会意思なし";
const NOSHOW_MARKER = "来店無し"; // manualJoinMonthにセットする特殊値
function parseDate(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr + "T00:00:00");
  return isNaN(d.getTime()) ? null : d;
}
function inMonth(dateStr, year, month) {
  const d = parseDate(dateStr);
  if (!d) return false;
  return d.getFullYear() === year && d.getMonth() + 1 === month;
}
function daysInMonth(year, month) { return new Date(year, month, 0).getDate(); }
function prevYearMonth(year, month) { return month === 1 ? [year - 1, 12] : [year, month - 1]; }
function nextYearMonth(year, month) { return month === 12 ? [year + 1, 1] : [year, month + 1]; }
function monthsOfYear(year) { return Array.from({ length: 12 }, (_, i) => ({ year, month: i + 1 })); }
function monthsOfHalf(year, half) {
  const start = half === 1 ? 1 : 7;
  return Array.from({ length: 6 }, (_, i) => ({ year, month: start + i }));
}
function monthLabel(m) { return `${m}月`; }
function ymEqual(y1, m1, y2, m2) { return y1 === y2 && m1 === m2; }

function filterTrials(trials, { store, staff, year, month, dayFrom, dayTo, asOf, excludeOptOut = true } = {}) {
  return trials.filter((t) => {
    if (store && t.store !== store) return false;
    if (staff && t.staff !== staff) return false;
    if (!staff && excludeOptOut && t.staff === EXCLUDED_STAFF) return false;
    if (excludeOptOut && t.manualJoinMonth === NOSHOW_MARKER) return false;
    if (year && month && !inMonth(t.lessonDate, year, month)) return false;
    if (dayFrom != null || dayTo != null) {
      const d = parseDate(t.lessonDate);
      if (!d) return false;
      const day = d.getDate();
      if (dayFrom != null && day < dayFrom) return false;
      if (dayTo != null && day > dayTo) return false;
    }
    if (asOf) {
      const d = parseDate(t.lessonDate);
      if (!d || d > asOf) return false; // 基準日より先の予約はCVR対象外（実施前のため）
    }
    return true;
  });
}
// 手動設定を考慮しない「自動検出のみ」の入会月（編集UIのプレースホルダー表示用）
function effectiveJoinMonthAuto(trial, joinsMap) {
  if (trial.manualJoinMonth === NOSHOW_MARKER) return null;
  if (!trial.memberId || !joinsMap) return null;
  const j = joinsMap.get(trial.memberId);
  return j ? j.month : null;
}
function buildJoinsMap(joins) {
  const m = new Map();
  for (const j of joins) if (j.memberId && !m.has(j.memberId)) m.set(j.memberId, j);
  return m;
}
// ある体験が「入会につながったか」を判定する。
// 1. 来店無し設定の場合は問答無用でnull（入会なし・集計除外）
// 2. 担当者欄に手動で入会月が設定されていればそれを優先（再入会など用）
// 3. なければメンバーIDで入会者データとライブ照合する
function effectiveJoinMonth(trial, joinsMap) {
  if (trial.manualJoinMonth === NOSHOW_MARKER) return null;
  if (trial.manualJoinMonth) return trial.manualJoinMonth;
  if (!trial.memberId || !joinsMap) return null;
  const j = joinsMap.get(trial.memberId);
  return j ? j.month : null;
}
function countTrialJoinsRows(rows, joinsMap) { return rows.filter((r) => effectiveJoinMonth(r, joinsMap) != null).length; }
function cvrOf(trialCount, joinCount) { return trialCount ? joinCount / trialCount : null; }
// months内の{trialCount, joinCount, cvr}を集計。asOfを渡すと「基準日までに実施済みの体験」だけに絞ってCVRを算出する
// （体験の総数を見たいときはasOfを省略、CVRを正しく出したいときはasOfを渡す、という使い分け）
// 「入会意思なし」担当者の行は既定で体験母数・CVRどちらからも除外される。
// joinsを渡すと、メンバーIDのライブ照合（＋手動設定の入会月）で入会数を判定する。
function aggregateTrialPeriod(trials, { store, staff, months, asOf, excludeOptOut = true, joins }) {
  const joinsMap = joins ? buildJoinsMap(joins) : null;
  let t = 0, j = 0;
  for (const m of months) {
    const rows = filterTrials(trials, { store, staff, year: m.year, month: m.month, asOf, excludeOptOut });
    t += rows.length;
    j += countTrialJoinsRows(rows, joinsMap);
  }
  return { trialCount: t, joinCount: j, cvr: cvrOf(t, j) };
}
// 期間内の「総予約数」と「うち基準日までに実施済み（CVR対象）」の差分を調べる補助関数
function countPendingTrials(trials, { store, staff, months, asOf }) {
  const total = aggregateTrialPeriod(trials, { store, staff, months }).trialCount;
  const eligible = aggregateTrialPeriod(trials, { store, staff, months, asOf }).trialCount;
  return total - eligible;
}
// 期間内で「入会意思なし」として除外された件数
function countOptOutTrials(trials, { store, months }) {
  return filterTrials(trials, { store, staff: EXCLUDED_STAFF, excludeOptOut: false }).filter((t) =>
    months.some((m) => inMonth(t.lessonDate, m.year, m.month))
  ).length;
}
// 期間内で「来店無し」として除外された件数
function countNoshowTrials(trials, { store, months }) {
  return trials.filter((t) => t.manualJoinMonth === NOSHOW_MARKER && (store ? t.store === store : true))
    .filter((t) => months.some((m) => inMonth(t.lessonDate, m.year, m.month))).length;
}

function getMemberMonthly(memberMonthly, store, year, month) {
  return memberMonthly.find((r) => r.store === store && r.year === year && r.month === month) || null;
}
function sumStoresMemberMonthly(memberMonthly, year, month, storeKeys = STORE_KEYS) {
  let total = 0, onHold = 0, joinsTotal = 0, leaves = 0, found = false;
  for (const s of storeKeys) {
    const r = getMemberMonthly(memberMonthly, s, year, month);
    if (!r) continue;
    found = true;
    total += r.total || 0; onHold += r.onHold || 0; joinsTotal += r.joinsTotal || 0; leaves += r.leaves || 0;
  }
  return found ? { total, onHold, joinsTotal, leaves } : null;
}
function getStoreOrAllMemberMonthly(memberMonthly, store, year, month) {
  if (!store) return sumStoresMemberMonthly(memberMonthly, year, month);
  return getMemberMonthly(memberMonthly, store, year, month);
}
function getPriorMonthTotal(memberMonthly, baselines, store, year, month) {
  const [py, pm] = prevYearMonth(year, month);
  if (!store) {
    const sum = sumStoresMemberMonthly(memberMonthly, py, pm);
    if (sum) return sum.total;
    let bt = 0, found = false;
    for (const s of STORE_KEYS) {
      const b = baselines[s];
      if (b && b.year === py && b.month === pm) { bt += b.total; found = true; }
    }
    return found ? bt : null;
  }
  const rec = getMemberMonthly(memberMonthly, store, py, pm);
  if (rec) return rec.total;
  const b = baselines[store];
  if (b && b.year === py && b.month === pm) return b.total;
  return null;
}
function churnRateOf(leaves, priorTotal) { return leaves != null && priorTotal ? leaves / priorTotal : null; }
function netIncreaseOf(joinsTotal, leaves) { return joinsTotal == null || leaves == null ? null : joinsTotal - leaves; }
function activeMembersOf(total, onHold) { return total == null ? null : total - (onHold || 0); }

function getBudgetRow(budgetTargets, store, year, month) {
  return budgetTargets.find((r) => r.store === store && r.year === year && r.month === month) || null;
}
function deriveTrialTarget(joinsTarget, cvrTargetPct) {
  if (joinsTarget == null || !cvrTargetPct) return null;
  return Math.ceil(joinsTarget / cvrTargetPct);
}
function getBudgetForStore(budgetTargets, store, year, month, targetCvrPct) {
  if (!store) {
    let revenue = 0, members = 0, joins = 0, leaves = 0, trials = 0, found = false;
    for (const s of STORE_KEYS) {
      const row = getBudgetRow(budgetTargets, s, year, month);
      if (!row) continue;
      found = true;
      revenue += row.revenue || 0; members += row.members || 0; joins += row.joins || 0; leaves += row.leaves || 0;
      trials += deriveTrialTarget(row.joins, targetCvrPct) || 0;
    }
    if (!found) return null;
    return { revenue, members, joins, leaves, trials, netIncrease: joins - leaves, cvr: targetCvrPct };
  }
  const row = getBudgetRow(budgetTargets, store, year, month);
  if (!row) return null;
  const trials = deriveTrialTarget(row.joins, targetCvrPct);
  return { revenue: row.revenue, members: row.members, joins: row.joins, leaves: row.leaves,
    trials, netIncrease: row.joins - row.leaves, cvr: targetCvrPct };
}
function getRevenueActual(revenueActuals, store, year, month) {
  if (!store) {
    let sum = 0, found = false;
    for (const s of STORE_KEYS) {
      const r = revenueActuals.find((x) => x.store === s && x.year === year && x.month === month);
      if (r) { sum += r.amount; found = true; }
    }
    return found ? sum : null;
  }
  const r = revenueActuals.find((x) => x.store === store && x.year === year && x.month === month);
  return r ? r.amount : null;
}

// ---------- 判定ロジック（4パターン） ----------
const J = {
  ACHIEVED: "achieved", ONTRACK: "onTrack", CAUTION: "caution", BEHIND: "behind",
  PENDING: "pending", MONITORING: "monitoring", EXCEEDED: "exceeded", REVIEW: "review", NONE: null,
};
function judgeSimple(actual, target) {
  if (actual == null || target == null) return null;
  return actual >= target ? J.ACHIEVED : J.REVIEW;
}
function judgeRevenue(actual, target, asOfDate, isCurrentMonth) {
  if (actual == null || target == null) return null;
  if (!isCurrentMonth) return actual >= target ? J.ACHIEVED : J.REVIEW;
  const day = asOfDate.getDate();
  if (day < 20) return J.PENDING;
  const ratio = target ? actual / target : null;
  if (ratio == null) return null;
  if (ratio >= 1) return J.ACHIEVED;
  if (ratio >= 0.9) return J.CAUTION;
  return J.BEHIND;
}
function judgePacing(actual, target, asOfDate, isCurrentMonth) {
  if (actual == null || target == null) return null;
  if (!isCurrentMonth) return actual >= target ? J.ACHIEVED : J.REVIEW;
  const day = asOfDate.getDate();
  const dim = daysInMonth(asOfDate.getFullYear(), asOfDate.getMonth() + 1);
  const ratio = target ? actual / target : null;
  const expected = day / dim;
  if (ratio == null) return null;
  if (ratio >= 1) return J.ACHIEVED;
  if (ratio >= expected) return J.ONTRACK;
  if (ratio >= expected - 0.1) return J.CAUTION;
  return J.BEHIND;
}
function judgeLowerBetter(actual, target, asOfDate, isCurrentMonth) {
  if (actual == null || target == null) return null;
  if (!isCurrentMonth) return actual <= target ? J.ACHIEVED : J.EXCEEDED;
  const day = asOfDate.getDate();
  const diff = target - actual;
  if (day < 16) return diff < 0 ? J.EXCEEDED : J.MONITORING;
  return diff >= 0 ? J.ACHIEVED : J.EXCEEDED;
}
const JUDGE_META = {
  achieved: { label: "達成", tone: "go" },
  onTrack: { label: "順調", tone: "blue" },
  caution: { label: "注意", tone: "amber" },
  behind: { label: "遅れ", tone: "red" },
  pending: { label: "判定前", tone: "neutral" },
  monitoring: { label: "監視中", tone: "neutral" },
  exceeded: { label: "超過", tone: "red" },
  review: { label: "要確認", tone: "amber" },
};

function cvrTone(value, target) {
  if (value == null || target == null) return "neutral";
  if (value >= target) return "go";
  if (value >= target * 0.8) return "amber";
  return "red";
}

// ============================================================
// CSV取り込み・クレンジング（旧VBAマクロ1・2の置き換え）
// ============================================================
function parseFlexibleDate(raw) {
  if (raw == null) return null;
  const s = String(raw).trim();
  if (!s) return null;
  let m = s.match(/^(\d{4})[\/\-年](\d{1,2})[\/\-月](\d{1,2})日?/);
  if (m) {
    const [, y, mo, d] = m;
    return `${y}-${String(mo).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  }
  m = s.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/); // MM/DD/YYYY fallback
  if (m) {
    const [, mo, d, y] = m;
    return `${y}-${String(mo).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  }
  const d = new Date(s);
  if (!isNaN(d.getTime())) return d.toISOString().slice(0, 10);
  return null;
}
function parseFlexibleTime(raw) {
  if (raw == null) return null;
  const s = String(raw).trim();
  const m = s.match(/^(\d{1,2}):(\d{2})/);
  if (m) return `${m[1].padStart(2, "0")}:${m[2]}`;
  return null;
}
const REQUIRED_TRIAL_FIELDS = [
  { key: "store", label: "店舗", required: true },
  { key: "ticket", label: "使用チケット", required: true },
  { key: "lessonDate", label: "受講日", required: true },
  { key: "memberId", label: "メンバーID", required: false },
  { key: "name", label: "氏名", required: false },
  { key: "gender", label: "性別", required: false },
  { key: "age", label: "年齢", required: false },
  { key: "applyDate", label: "予約処理日", required: false },
  { key: "startTime", label: "開始時刻", required: false },
];
const REQUIRED_JOIN_FIELDS = [
  { key: "memberId", label: "メンバーID", required: true },
  { key: "effectiveDate", label: "プラン契約適用開始日", required: true },
];
const HEADER_HINTS = {
  store: ["店舗", "店", "施設"],
  ticket: ["チケット", "使用チケット", "種別", "予約枠"],
  lessonDate: ["受講日", "予約日", "来店日", "実施日"],
  memberId: ["メンバーid", "会員id", "id", "メンバー番号", "会員番号"],
  name: ["氏名", "名前", "お名前"],
  gender: ["性別"],
  age: ["年齢"],
  applyDate: ["予約処理日", "申込日", "予約日時"],
  startTime: ["開始時刻", "時刻", "時間"],
  effectiveDate: ["プラン契約適用開始日", "契約適用開始日", "適用開始日", "入会日"],
};
function suggestMapping(headers, fields = REQUIRED_TRIAL_FIELDS) {
  const lower = headers.map((h) => String(h).toLowerCase());
  const mapping = {};
  for (const f of fields) {
    const hints = HEADER_HINTS[f.key] || [];
    let found = "";
    for (const hint of hints) {
      const idx = lower.findIndex((h) => h.includes(hint.toLowerCase()));
      if (idx !== -1) { found = headers[idx]; break; }
    }
    mapping[f.key] = found;
  }
  return mapping;
}
function isFreeTrialTicket(ticketRaw) {
  return String(ticketRaw || "").includes("無料体験チケット");
}
// 生CSV行 + マッピング -> クレンジング済み入会候補（メンバーID＋プラン契約適用開始日の年月）
function cleanJoinCsvRows(rawRows, mapping) {
  const out = [];
  for (const row of rawRows) {
    const idRaw = mapping.memberId ? row[mapping.memberId] : "";
    const memberId = idRaw != null ? String(idRaw).trim().replace(/[　\s]/g, "") : "";
    if (!memberId) continue;
    const dateRaw = mapping.effectiveDate ? row[mapping.effectiveDate] : "";
    const iso = parseFlexibleDate(dateRaw);
    if (!iso) continue;
    const [y, m] = iso.split("-").map(Number);
    out.push({ memberId, year: y, month: m });
  }
  return out;
}
// 生CSV行 + マッピング -> クレンジング済みtrial候補（store正規化・無料体験のみ）
function cleanCsvRows(rawRows, mapping) {
  const out = [];
  for (const row of rawRows) {
    const ticketRaw = mapping.ticket ? row[mapping.ticket] : "";
    if (!isFreeTrialTicket(ticketRaw)) continue;
    const storeRaw = mapping.store ? row[mapping.store] : "";
    const store = matchStoreName(storeRaw);
    const lessonDate = mapping.lessonDate ? parseFlexibleDate(row[mapping.lessonDate]) : null;
    const memberIdRaw = mapping.memberId ? row[mapping.memberId] : "";
    const memberId = memberIdRaw != null && String(memberIdRaw).trim() !== ""
      ? String(memberIdRaw).trim().replace(/[　\s]/g, "") : null;
    out.push({
      store, ticket: String(ticketRaw).trim(), lessonDate,
      applyDate: mapping.applyDate ? parseFlexibleDate(row[mapping.applyDate]) : null,
      startTime: mapping.startTime ? parseFlexibleTime(row[mapping.startTime]) : null,
      memberId,
      name: mapping.name ? String(row[mapping.name] || "").trim() : "",
      gender: mapping.gender ? String(row[mapping.gender] || "").trim() : "",
      age: mapping.age ? (Number(row[mapping.age]) || null) : null,
      staff: "", note: "",
    });
  }
  return out;
}
// 既存trialsとID重複チェック：先に存在するものを優先、新規取込側の重複はスキップ
function dedupeAgainstExisting(candidates, existingTrials) {
  const existingIds = new Set(existingTrials.filter((t) => t.memberId).map((t) => t.memberId));
  const seenInBatch = new Set();
  const accepted = [];
  let skipped = 0;
  for (const c of candidates) {
    if (c.memberId) {
      if (existingIds.has(c.memberId) || seenInBatch.has(c.memberId)) { skipped++; continue; }
      seenInBatch.add(c.memberId);
    }
    accepted.push(c);
  }
  return { accepted, skipped };
}
function dedupeJoins(candidates, existingJoins) {
  const existingIds = new Set(existingJoins.map((j) => j.memberId));
  const seenInBatch = new Set();
  const accepted = [];
  let skipped = 0;
  for (const c of candidates) {
    if (!c.memberId) { skipped++; continue; }
    if (existingIds.has(c.memberId) || seenInBatch.has(c.memberId)) { skipped++; continue; }
    seenInBatch.add(c.memberId);
    accepted.push(c);
  }
  return { accepted, skipped };
}
function rowValue(row, names) {
  for (const name of names) {
    if (Object.prototype.hasOwnProperty.call(row, name)) return row[name];
  }
  const keys = Object.keys(row);
  for (const name of names) {
    const key = keys.find((k) => String(k).trim() === name || String(k).includes(name));
    if (key) return row[key];
  }
  return "";
}
function normalizeMemberId(raw) {
  return raw != null ? String(raw).trim().replace(/[　\s]/g, "") : "";
}
function monthOfIsoDate(dateStr) {
  return dateStr ? dateStr.slice(0, 7) : null;
}
function daysBetween(startStr, endStr) {
  const start = parseDate(startStr);
  const end = parseDate(endStr);
  if (!start || !end) return null;
  return Math.max(0, Math.round((end.getTime() - start.getTime()) / 86400000));
}
function monthsBetween(startStr, endStr) {
  const start = parseDate(startStr);
  const end = parseDate(endStr);
  if (!start || !end) return null;
  let months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  if (end.getDate() < start.getDate()) months -= 1;
  return Math.max(0, months);
}
function ageBandOf(age) {
  const n = Number(age);
  if (!n || isNaN(n)) return "";
  if (n < 20) return "10代以下";
  if (n < 30) return "20代";
  if (n < 40) return "30代";
  if (n < 50) return "40代";
  if (n < 60) return "50代";
  return "60代以上";
}
function tenureBandOf(months) {
  if (months == null || isNaN(months)) return null;
  if (months <= 3) return "3ヶ月以内";
  if (months <= 6) return "4〜6ヶ月";
  if (months <= 12) return "7〜12ヶ月";
  return "13ヶ月以上";
}
function cancellationTenureStartDate(row) {
  return row?.joinDate || row?.planContractDate || null;
}
function cancellationTenureDays(row) {
  if (!row?.planEndDate) return null;
  const startDate = cancellationTenureStartDate(row);
  return startDate ? daysBetween(startDate, row.planEndDate) : null;
}
function cancellationTenureMonths(row) {
  if (!row?.planEndDate) return null;
  const startDate = cancellationTenureStartDate(row);
  return startDate ? monthsBetween(startDate, row.planEndDate) : null;
}
function cancellationTenureBand(row) {
  return tenureBandOf(cancellationTenureMonths(row));
}
function inactiveBandOf(days) {
  if (days == null || isNaN(days)) return null;
  if (days <= 7) return "0〜7日";
  if (days <= 14) return "8〜14日";
  if (days <= 30) return "15〜30日";
  if (days <= 60) return "31〜60日";
  return "61日以上";
}
function parseCancellationRows(rawRows) {
  const rows = [];
  const seen = new Set();
  const rawMonthCounts = {};
  const validMonthCounts = {};
  let skipped = 0;
  for (const row of rawRows) {
    const memberId = normalizeMemberId(rowValue(row, ["メンバーID", "会員ID", "メンバー_ID"]));
    const planEndDate = parseFlexibleDate(rowValue(row, ["プラン契約適用終了日"]));
    const cancellationMonth = monthOfIsoDate(planEndDate);
    if (cancellationMonth) rawMonthCounts[cancellationMonth] = (rawMonthCounts[cancellationMonth] || 0) + 1;
    if (!memberId || !planEndDate) { skipped++; continue; }
    const store = matchStoreName(rowValue(row, ["メンバー所属店舗名", "所属店舗名", "店舗名"]));
    const uniqueKey = `${memberId}__${planEndDate}__${store || ""}`;
    if (seen.has(uniqueKey)) { skipped++; continue; }
    seen.add(uniqueKey);
    if (cancellationMonth) validMonthCounts[cancellationMonth] = (validMonthCounts[cancellationMonth] || 0) + 1;

    const planContractDate = parseFlexibleDate(rowValue(row, ["プラン契約日"]));
    const cancellationRequestDate = parseFlexibleDate(rowValue(row, ["退会手続き日"]));
    const lastLessonDate = parseFlexibleDate(rowValue(row, ["最終受講日時"]));
    const joinDate = parseFlexibleDate(rowValue(row, ["入会日時"]));
    const tenureSource = { joinDate, planContractDate, planEndDate };
    const tenureDays = cancellationTenureDays(tenureSource);
    const tenureMonths = cancellationTenureMonths(tenureSource);
    const inactiveBeforeCancelDays = cancellationRequestDate ? daysBetween(lastLessonDate, cancellationRequestDate) : null;
    const age = Number(rowValue(row, ["年齢"])) || null;

    rows.push({
      memberId,
      name: String(rowValue(row, ["氏名", "名前"]) || "").trim(),
      gender: String(rowValue(row, ["性別"]) || "").trim(),
      birthDate: parseFlexibleDate(rowValue(row, ["生年月日"])),
      age,
      ageGroup: ageBandOf(age),
      postalCode: String(rowValue(row, ["郵便番号"]) || "").trim(),
      prefecture: String(rowValue(row, ["都道府県"]) || "").trim(),
      address1: String(rowValue(row, ["住所1"]) || "").trim(),
      address2: String(rowValue(row, ["住所2"]) || "").trim(),
      trialLessonDate: parseFlexibleDate(rowValue(row, ["無料体験会 受講日時", "無料体験会受講日時"])),
      firstTrialLessonDate: parseFlexibleDate(rowValue(row, ["トライアル 初回受講日時", "トライアル初回受講日時"])),
      joinDate: parseFlexibleDate(rowValue(row, ["入会日時"])),
      lastLessonDate,
      store,
      planName: String(rowValue(row, ["契約プラン名", "プラン名"]) || "").trim(),
      planContractDate,
      planStartDate: parseFlexibleDate(rowValue(row, ["プラン契約適用開始日"])),
      planEndDate,
      cancellationRequestDate,
      status: String(rowValue(row, ["ステータス"]) || "").trim(),
      cancellationMonth,
      requestMonth: monthOfIsoDate(cancellationRequestDate),
      tenureDays,
      tenureMonths,
      tenureBand: tenureBandOf(tenureMonths),
      inactiveBeforeCancelDays,
      inactiveBand: inactiveBandOf(inactiveBeforeCancelDays),
    });
  }
  return { rows, skipped, rawMonthCounts, validMonthCounts };
}
function cancellationMonthOf(row) {
  return row?.cancellationMonth || monthOfIsoDate(row?.planEndDate);
}
function cancellationDedupKey(row) {
  return `${row?.memberId || ""}__${row?.planEndDate || ""}__${matchStoreName(row?.store || "") || ""}`;
}
function cancellationMonthLabel(ym) {
  const [year, month] = String(ym || "").split("-");
  if (!year || !month) return ym || "—";
  return `${Number(year)}年${Number(month)}月`;
}
function monthlyCancellationCounts(rows) {
  const counts = {};
  for (const row of rows || []) {
    const ym = cancellationMonthOf(row);
    if (!ym) continue;
    counts[ym] = (counts[ym] || 0) + 1;
  }
  return Object.entries(counts)
    .map(([ym, count]) => ({ ym, count }))
    .sort((a, b) => b.ym.localeCompare(a.ym));
}
function normalizeCancellations(value) {
  const rows = Array.isArray(value) ? value : (Array.isArray(value?.rows) ? value.rows : []);
  const imports = { ...(value && !Array.isArray(value) && value.imports ? value.imports : {}) };
  const oldImportedAt = value && !Array.isArray(value) ? value.importedAt : null;
  const oldSource = value && !Array.isArray(value) ? value.source : null;
  for (const { ym, count } of monthlyCancellationCounts(rows)) {
    if (!imports[ym]) {
      imports[ym] = {
        importedAt: oldImportedAt || null,
        filename: oldSource?.filename || null,
        rowCount: count,
        validCount: count,
      };
    }
  }
  return {
    rows,
    imports,
    importedAt: oldImportedAt || null,
    source: oldSource || null,
  };
}
function mergeCancellationImport(currentValue, parsed, source) {
  const current = normalizeCancellations(currentValue);
  const importMonths = [...new Set((parsed.rows || []).map(cancellationMonthOf).filter(Boolean))];
  const importMonthSet = new Set(importMonths);
  const nextRows = [
    ...current.rows.filter((row) => !importMonthSet.has(cancellationMonthOf(row))),
    ...parsed.rows,
  ];
  const deduped = [];
  const seen = new Set();
  for (const row of nextRows) {
    const key = cancellationDedupKey(row);
    if (seen.has(key)) continue;
    seen.add(key);
    deduped.push(row);
  }
  const importedAt = new Date().toISOString();
  const imports = { ...current.imports };
  for (const ym of importMonths) {
    imports[ym] = {
      importedAt,
      filename: source?.filename || null,
      rowCount: parsed.rawMonthCounts?.[ym] ?? parsed.validMonthCounts?.[ym] ?? 0,
      validCount: parsed.validMonthCounts?.[ym] ?? 0,
    };
  }
  return {
    rows: deduped,
    imports,
    importedAt,
    source,
  };
}
function deleteCancellationMonth(currentValue, ym) {
  const current = normalizeCancellations(currentValue);
  const imports = { ...current.imports };
  delete imports[ym];
  return {
    ...current,
    rows: current.rows.filter((row) => cancellationMonthOf(row) !== ym),
    imports,
  };
}
function deleteAllCancellations(currentValue) {
  const current = normalizeCancellations(currentValue);
  return {
    ...current,
    rows: [],
    imports: {},
    importedAt: null,
    source: null,
  };
}
const COUNSELING_TICKETS = [
  "初回カウンセリング",
  "２回目カウンセリング",
  "３回目カウンセリング",
  "４回目以降カウンセリング",
];
const COUNSELING_STAGE_LABELS = {
  0: "初回未実施",
  1: "初回済み",
  2: "2回目済み",
  3: "3回目済み",
  4: "4回目以降済み",
};
const COUNSELING_PROGRESS_DEFINITION = [
  "0回：初回カウンセリング未実施",
  "1回：初回カウンセリングまで実施",
  "2回：2回目カウンセリングまで実施",
  "3回：3回目カウンセリングまで実施",
  "4回目以降：4回目以降カウンセリング実施済み",
];
function normalizeCounselingTicketName(ticketRaw) {
  return String(ticketRaw || "")
    .normalize("NFKC")
    .replace(/[　\s]/g, "")
    .trim();
}
function normalizedCounselingStatus(statusRaw) {
  return String(statusRaw || "")
    .normalize("NFKC")
    .replace(/[　\s]/g, "")
    .trim();
}
function normalizeCounselingReservations(value) {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.rows)) return value.rows;
  return [];
}
function normalizeCounselingMeta(value) {
  return value && typeof value === "object" && !Array.isArray(value) ? value : {
    importedAt: null,
    filename: null,
    rowCount: 0,
    validCount: 0,
    excludedCount: 0,
    blankMemberIdCount: 0,
    ticketExcludedCount: 0,
    unknownDateCount: 0,
    duplicateFallbackCount: 0,
  };
}
function emptyCounselingMeta() {
  return {
    importedAt: null,
    filename: null,
    rowCount: 0,
    validCount: 0,
    excludedCount: 0,
    blankMemberIdCount: 0,
    ticketExcludedCount: 0,
    unknownDateCount: 0,
    duplicateFallbackCount: 0,
  };
}
function parseCounselingDate(raw) {
  if (raw == null) return null;
  const s = String(raw).trim();
  if (!s) return null;
  let m = s.match(/^(\d{4})[\/\-年](\d{1,2})[\/\-月](\d{1,2})日?/);
  if (m) return `${m[1]}-${String(m[2]).padStart(2, "0")}-${String(m[3]).padStart(2, "0")}`;
  m = s.match(/^(\d{4})(\d{2})(\d{2})$/);
  if (m) return `${m[1]}-${m[2]}-${m[3]}`;
  return parseFlexibleDate(s);
}
function counselingMonthOf(row) {
  return row?.lessonMonth || monthOfIsoDate(row?.lessonDate);
}
function counselingMonthLabel(ym) {
  const [year, month] = String(ym || "").split("-");
  if (!year || !month) return ym || "—";
  return `${Number(year)}年${Number(month)}月`;
}
function monthlyCounselingCounts(rows) {
  const counts = {};
  for (const row of normalizeCounselingReservations(rows)) {
    const ym = counselingMonthOf(row);
    if (!ym) continue;
    counts[ym] = (counts[ym] || 0) + 1;
  }
  return Object.entries(counts)
    .map(([ym, count]) => ({ ym, count }))
    .sort((a, b) => b.ym.localeCompare(a.ym));
}
function isCounselingTicket(ticketRaw) {
  return counselingTicketStage(ticketRaw) > 0;
}
function counselingStatusIsCanceled(status) {
  const s = normalizedCounselingStatus(status);
  return s.includes("キャンセル") || s.includes("取消") || s.includes("中止");
}
function counselingReservationIsPerformed(row) {
  if (counselingStatusIsCanceled(row?.reservationStatus)) return false;
  const s = normalizedCounselingStatus(row?.reservationStatus);
  return s === "チェックイン" || s.includes("受講済") || s.includes("実施") || s.includes("完了");
}
function counselingReservationStageCounts(rows, { performedOnly = false } = {}) {
  const counts = { total: 0, 1: 0, 2: 0, 3: 0, 4: 0 };
  for (const row of normalizeCounselingReservations(rows)) {
    if (!row?.memberId || !row?.lessonDate) continue;
    if (counselingStatusIsCanceled(row.reservationStatus)) continue;
    if (performedOnly && !counselingReservationIsPerformed(row)) continue;
    const stage = counselingTicketStage(row.ticket);
    if (!stage) continue;
    counts.total += 1;
    counts[Math.min(stage, 4)] += 1;
  }
  return counts;
}
function counselingReservationKey(row) {
  if (row.reservationId) return `reservation:${row.reservationId}`;
  return `fallback:${row.memberId || ""}__${row.lessonDate || ""}__${row.startTime || ""}__${row.ticket || ""}`;
}
const REQUIRED_COUNSELING_RESERVATION_HEADERS = [
  { label: "予約ID", names: ["予約ID", "予約 Id", "予約番号"] },
  { label: "予約ステータス", names: ["予約ステータス", "ステータス"] },
  { label: "店舗", names: ["店舗", "店舗名", "施設", "施設名"] },
  { label: "使用チケット", names: ["使用チケット", "チケット", "チケット名"] },
  { label: "予約処理日", names: ["予約処理日", "予約受付日", "申込日"] },
  { label: "受講日", names: ["受講日", "予約日", "実施日", "来店日"] },
  { label: "開始時刻", names: ["開始時刻", "開始時間", "開始"] },
  { label: "終了時刻", names: ["終了時刻", "終了時間", "終了"] },
  { label: "スタッフ名", names: ["スタッフ名", "担当スタッフ", "担当者"] },
  { label: "メンバーID", names: ["メンバーID", "会員ID", "メンバー_ID"] },
  { label: "氏名", names: ["氏名", "名前", "会員名", "メンバー名"] },
  { label: "性別", names: ["性別"] },
  { label: "年齢", names: ["年齢"] },
];
function csvHeaderExists(headers, names) {
  return names.some((name) => headers.some((header) => {
    const h = String(header || "").replace(/^\uFEFF/, "").trim();
    return h === name || h.includes(name);
  }));
}
function missingCounselingReservationHeaders(headers) {
  const fields = Array.isArray(headers) ? headers : [];
  return REQUIRED_COUNSELING_RESERVATION_HEADERS
    .filter((field) => !csvHeaderExists(fields, field.names))
    .map((field) => field.label);
}
function parseCounselingRows(rawRows) {
  const map = new Map();
  const stats = {
    rowCount: rawRows.length,
    validCount: 0,
    excludedCount: 0,
    blankMemberIdCount: 0,
    ticketExcludedCount: 0,
    unknownDateCount: 0,
    duplicateFallbackCount: 0,
    missingRequiredHeaders: [],
  };
  for (const row of rawRows) {
    const ticket = String(rowValue(row, ["使用チケット", "チケット", "チケット名"]) || "").trim();
    if (!isCounselingTicket(ticket)) {
      stats.ticketExcludedCount += 1;
      continue;
    }
    const memberId = normalizeMemberId(rowValue(row, ["メンバーID", "会員ID", "メンバー_ID"]));
    if (!memberId) {
      stats.blankMemberIdCount += 1;
      continue;
    }
    const lessonDate = parseCounselingDate(rowValue(row, ["受講日", "予約日", "実施日", "来店日"]));
    const lessonMonth = monthOfIsoDate(lessonDate);
    if (!lessonMonth) {
      stats.unknownDateCount += 1;
      continue;
    }
    const reservationId = String(rowValue(row, ["予約ID", "予約 Id", "予約番号"]) || "").trim();
    const startTime = parseFlexibleTime(rowValue(row, ["開始時刻", "開始時間", "開始"])) || String(rowValue(row, ["開始時刻", "開始時間", "開始"]) || "").trim();
    const record = {
      reservationId,
      reservationStatus: String(rowValue(row, ["予約ステータス", "ステータス"]) || "").trim(),
      store: matchStoreName(rowValue(row, ["店舗", "店舗名", "施設", "施設名"])) || String(rowValue(row, ["店舗", "店舗名", "施設", "施設名"]) || "").trim(),
      ticket,
      processedDate: parseCounselingDate(rowValue(row, ["予約処理日", "予約受付日", "申込日"])),
      lessonDate,
      lessonMonth,
      startTime,
      endTime: parseFlexibleTime(rowValue(row, ["終了時刻", "終了時間", "終了"])) || String(rowValue(row, ["終了時刻", "終了時間", "終了"]) || "").trim(),
      staffName: String(rowValue(row, ["スタッフ名", "担当スタッフ", "担当者"]) || "").trim(),
      memberId,
      name: String(rowValue(row, ["氏名", "名前", "会員名", "メンバー名"]) || "").trim(),
      gender: String(rowValue(row, ["性別"]) || "").trim(),
      age: Number(rowValue(row, ["年齢"])) || null,
    };
    const key = counselingReservationKey(record);
    if (!reservationId && map.has(key)) {
      stats.duplicateFallbackCount += 1;
      console.warn("[counseling] duplicate fallback reservation key; later row wins", key);
    }
    map.set(key, record);
  }
  const rows = [...map.values()];
  stats.validCount = rows.length;
  stats.excludedCount = stats.rowCount - stats.validCount;
  return { rows, stats };
}
function mergeCounselingReservations(currentValue, rows) {
  const currentRows = normalizeCounselingReservations(currentValue);
  const importMonths = [...new Set((rows || []).map(counselingMonthOf).filter(Boolean))];
  const importMonthSet = new Set(importMonths);
  return [
    ...currentRows.filter((row) => !importMonthSet.has(counselingMonthOf(row))),
    ...(rows || []),
  ];
}
function deleteCounselingReservationMonth(currentValue, ym) {
  return normalizeCounselingReservations(currentValue).filter((row) => counselingMonthOf(row) !== ym);
}
function exactRowValue(row, names) {
  for (const name of names) {
    if (Object.prototype.hasOwnProperty.call(row, name)) return row[name];
  }
  const keys = Object.keys(row);
  for (const name of names) {
    const key = keys.find((k) => String(k).trim() === name);
    if (key) return row[key];
  }
  return "";
}
function normalizedCsvHeaderName(value) {
  return String(value ?? "")
    .normalize("NFKC")
    .replace(/^\uFEFF/, "")
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .trim()
    .replace(/[　\s_＿]/g, "")
    .toLowerCase();
}
function activeMemberRowValue(row, names, { exact = false } = {}) {
  const keys = Object.keys(row || {});
  const normalizedNames = names.map(normalizedCsvHeaderName);
  for (const key of keys) {
    const normalizedKey = normalizedCsvHeaderName(key);
    const index = normalizedNames.findIndex((name) => normalizedKey === name);
    if (index >= 0) return row[key];
  }
  if (exact) return "";
  for (const key of keys) {
    const normalizedKey = normalizedCsvHeaderName(key);
    const index = normalizedNames.findIndex((name) => normalizedKey.includes(name));
    if (index >= 0) return row[key];
  }
  return "";
}
function activeMemberPreviewStats(text, parseResult, parsedStats) {
  const fields = Array.isArray(parseResult?.meta?.fields) ? parseResult.meta.fields : [];
  const cleanText = String(text || "");
  return {
    ...parsedStats,
    csvCharCount: cleanText.length,
    parsedRowCount: Array.isArray(parseResult?.data) ? parseResult.data.length : 0,
    headerFields: fields.map((field) => String(field ?? "").replace(/^\uFEFF/, "").trim()).filter(Boolean).slice(0, 12),
  };
}
function normalizeCounselingActiveMembers(value) {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.rows)) return value.rows;
  return [];
}
function normalizeCounselingActiveMembersMeta(value) {
  if (value && typeof value === "object" && !Array.isArray(value) && value.meta) return value.meta;
  return {
    importedAt: null,
    filename: null,
    rowCount: 0,
    validCount: 0,
    excludedCount: 0,
    blankMemberIdCount: 0,
    duplicateMemberIdCount: 0,
  };
}
function normalizeCounselingNewMembers(value) {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.rows)) return value.rows;
  return [];
}
function normalizeCounselingNewMembersMeta(value) {
  if (value && typeof value === "object" && !Array.isArray(value) && value.meta) return value.meta;
  return {
    importedAt: null,
    filename: null,
    rowCount: 0,
    validCount: 0,
    excludedCount: 0,
    blankMemberIdCount: 0,
    duplicateMemberIdCount: 0,
    unknownStartDateCount: 0,
  };
}
function normalizeCounselingMemberImports(value) {
  const imports = value && typeof value === "object" && !Array.isArray(value) ? value.imports : null;
  if (Array.isArray(imports)) return imports;
  if (imports && typeof imports === "object") return Object.values(imports);
  return [];
}
function normalizeCounselingCancelMembers(value) {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.rows)) return value.rows;
  return [];
}
function normalizeCounselingCancelMembersMeta(value) {
  if (value && typeof value === "object" && !Array.isArray(value) && value.meta) return value.meta;
  return {
    importedAt: null,
    filename: null,
    rowCount: 0,
    validCount: 0,
    excludedCount: 0,
    blankMemberIdCount: 0,
    duplicateMemberIdCount: 0,
    unknownStartDateCount: 0,
    unknownCancelMonthCount: 0,
  };
}
function counselingNewMemberMonthOf(row) {
  return row?.startMonth || monthOfIsoDate(row?.startDate);
}
function counselingCancelMemberMonthOf(row) {
  return row?.cancelMonth || monthOfIsoDate(row?.planEndDate);
}
function monthlyCounselingMemberCounts(rows, monthOf) {
  const counts = {};
  for (const row of rows || []) {
    const ym = monthOf(row);
    if (!ym) continue;
    counts[ym] = (counts[ym] || 0) + 1;
  }
  return Object.entries(counts)
    .map(([ym, count]) => ({ ym, count }))
    .sort((a, b) => a.ym.localeCompare(b.ym));
}
function mergeCounselingMemberMonthImport(currentValue, importedRows, stats, filename, monthOf) {
  const currentRows = Array.isArray(currentValue?.rows) ? currentValue.rows : normalizeCounselingNewMembers(currentValue);
  const importMonths = [...new Set((importedRows || []).map(monthOf).filter(Boolean))];
  const importMonthSet = new Set(importMonths);
  const nextRowsRaw = [
    ...currentRows.filter((row) => !importMonthSet.has(monthOf(row))),
    ...(importedRows || []),
  ];
  const nextRowsByMemberId = new Map();
  for (const row of nextRowsRaw) {
    const key = row?.memberId || JSON.stringify(row);
    nextRowsByMemberId.set(key, row);
  }
  const nextRows = [...nextRowsByMemberId.values()];
  const importedAt = new Date().toISOString();
  const previousImports = normalizeCounselingMemberImports(currentValue);
  const nextImports = [
    ...previousImports.filter((item) => {
      const months = Array.isArray(item?.months) ? item.months : [item?.month].filter(Boolean);
      return !months.some((month) => importMonthSet.has(month));
    }),
    {
      importedAt,
      fileName: filename || null,
      months: importMonths,
      totalRows: stats?.rowCount || 0,
      validRows: (importedRows || []).length,
    },
  ];
  return {
    rows: nextRows,
    imports: nextImports,
    meta: {
      lastImportedAt: importedAt,
      lastFileName: filename || null,
      importedAt,
      filename: filename || null,
      ...(stats || {}),
    },
  };
}
function deleteCounselingMemberMonth(currentValue, ym, monthOf, normalizeRows, normalizeMeta) {
  const rows = normalizeRows(currentValue);
  const imports = normalizeCounselingMemberImports(currentValue).filter((item) => {
    const months = Array.isArray(item?.months) ? item.months : [item?.month].filter(Boolean);
    return !months.includes(ym);
  });
  return {
    rows: rows.filter((row) => monthOf(row) !== ym),
    imports,
    meta: normalizeMeta(currentValue),
  };
}
function deleteAllCounselingMembers(currentValue, normalizeMeta) {
  return {
    rows: [],
    imports: [],
    meta: {
      ...normalizeMeta(currentValue),
      rowCount: 0,
      validCount: 0,
      excludedCount: 0,
    },
  };
}
function deleteAllCounselingActiveMembers(currentValue) {
  const meta = normalizeCounselingActiveMembersMeta(currentValue);
  return {
    rows: [],
    meta: {
      ...meta,
      importedAt: null,
      filename: null,
      rowCount: 0,
      validCount: 0,
      excludedCount: 0,
      blankMemberIdCount: 0,
      duplicateMemberIdCount: 0,
    },
  };
}
function parseCounselingActiveMembers(rawRows) {
  const map = new Map();
  const stats = {
    rowCount: rawRows.length,
    validCount: 0,
    excludedCount: 0,
    blankMemberIdCount: 0,
    duplicateMemberIdCount: 0,
  };
  for (const row of rawRows) {
    const memberId = normalizeMemberId(activeMemberRowValue(row, ["メンバーID", "メンバー ID", "メンバーＩＤ", "会員ID", "メンバー_ID", "会員番号", "memberId", "member_id"]));
    if (!memberId) {
      stats.blankMemberIdCount += 1;
      continue;
    }
    if (map.has(memberId)) {
      stats.duplicateMemberIdCount += 1;
      console.warn("[counseling] duplicate active member id; later row wins", memberId);
    }
    const storeRaw = String(activeMemberRowValue(row, ["所属店舗名"], { exact: true }) || "").trim();
    const joinDate = parseCounselingDate(activeMemberRowValue(row, ["入会日時"]));
    const cancellationRequestDate = parseCounselingDate(activeMemberRowValue(row, ["退会手続き日"]));
    const activeMember = {
      memberId,
      name: String(activeMemberRowValue(row, ["氏名", "名前", "会員名", "メンバー名"]) || "").trim(),
      gender: String(activeMemberRowValue(row, ["性別"]) || "").trim(),
      age: Number(activeMemberRowValue(row, ["年齢"])) || null,
      belongingStoreName: storeRaw,
      store: matchStoreName(storeRaw) || storeRaw,
      joinDate,
      startDate: joinDate,
      startMonth: monthOfIsoDate(joinDate),
      planName: String(activeMemberRowValue(row, ["契約プラン名", "プラン名"]) || "").trim(),
      planContractDate: parseCounselingDate(activeMemberRowValue(row, ["プラン契約日"])),
      planStartDate: parseCounselingDate(activeMemberRowValue(row, ["プラン契約適用開始日"])),
      planEndDate: parseCounselingDate(activeMemberRowValue(row, ["プラン契約適用終了日"])),
      cancellationRequestDate,
      statusCategory: cancellationRequestDate ? "退会予定" : "契約中",
    };
    map.set(memberId, activeMember);
  }
  const rows = [...map.values()];
  stats.validCount = rows.length;
  stats.excludedCount = stats.rowCount - stats.validCount;
  return { rows, stats };
}
function parseCounselingNewMembers(rawRows) {
  const map = new Map();
  const stats = {
    rowCount: rawRows.length,
    validCount: 0,
    excludedCount: 0,
    blankMemberIdCount: 0,
    duplicateMemberIdCount: 0,
    unknownStartDateCount: 0,
  };
  for (const row of rawRows) {
    const memberId = normalizeMemberId(activeMemberRowValue(row, ["メンバーID", "メンバー ID", "メンバーＩＤ", "会員ID", "メンバー_ID", "会員番号", "memberId", "member_id"]));
    if (!memberId) {
      stats.blankMemberIdCount += 1;
      continue;
    }
    if (map.has(memberId)) {
      stats.duplicateMemberIdCount += 1;
      console.warn("[counseling] duplicate new member id; later row wins", memberId);
    }
    const storeRaw = String(activeMemberRowValue(row, ["所属店舗名"], { exact: true }) || "").trim();
    const joinDate = parseCounselingDate(activeMemberRowValue(row, ["入会日時"]));
    const planStartDate = parseCounselingDate(activeMemberRowValue(row, ["プラン契約適用開始日"]));
    const startDate = planStartDate || joinDate;
    if (!startDate) stats.unknownStartDateCount += 1;
    const newMember = {
      memberId,
      name: String(activeMemberRowValue(row, ["氏名", "名前", "会員名", "メンバー名"]) || "").trim(),
      gender: String(activeMemberRowValue(row, ["性別"]) || "").trim(),
      age: Number(activeMemberRowValue(row, ["年齢"])) || null,
      belongingStoreName: storeRaw,
      store: matchStoreName(storeRaw) || storeRaw,
      joinDate,
      planStartDate,
      startDate,
      startMonth: monthOfIsoDate(startDate),
      planName: String(activeMemberRowValue(row, ["契約プラン名", "プラン名"]) || "").trim(),
      planContractDate: parseCounselingDate(activeMemberRowValue(row, ["プラン契約日"])),
      planEndDate: parseCounselingDate(activeMemberRowValue(row, ["プラン契約適用終了日"])),
    };
    map.set(memberId, newMember);
  }
  const rows = [...map.values()];
  stats.validCount = rows.length;
  stats.excludedCount = stats.rowCount - stats.validCount;
  return { rows, stats };
}
function buildCounselingNewMembersFromJoinCsv(rawRows, filename = "入会者データCSV") {
  const rows = rawRows || [];
  const parsed = parseCounselingNewMembers(rows);
  const headerFields = rows[0] ? Object.keys(rows[0]) : [];
  const hasBelongingStore = headerFields.some((h) => String(h).trim() === "所属店舗名");
  const hasPlanStart = headerFields.some((h) => String(h).includes("プラン契約適用開始日"));
  const hasJoinDate = headerFields.some((h) => String(h).includes("入会日時"));
  const warnings = [];
  if (!hasBelongingStore) warnings.push("所属店舗名列が見つかりません。");
  if (!hasPlanStart && !hasJoinDate) warnings.push("利用開始日の判定に必要な列が見つかりません。");
  if (parsed.stats.blankMemberIdCount) warnings.push(`メンバーID空欄 ${parsed.stats.blankMemberIdCount}件を除外しました。`);
  if (parsed.stats.unknownStartDateCount) warnings.push(`利用開始日不明 ${parsed.stats.unknownStartDateCount}件があります。`);
  return {
    ...parsed,
    stats: {
      ...parsed.stats,
      headerFields,
    },
    filename,
    warnings,
  };
}
function parseCounselingCancelMembers(rawRows, newMembersValue) {
  const newMembersById = new Map(normalizeCounselingNewMembers(newMembersValue).map((member) => [member.memberId, member]));
  const map = new Map();
  const stats = {
    rowCount: rawRows.length,
    validCount: 0,
    excludedCount: 0,
    blankMemberIdCount: 0,
    duplicateMemberIdCount: 0,
    unknownStartDateCount: 0,
    unknownCancelMonthCount: 0,
  };
  for (const row of rawRows) {
    const memberId = normalizeMemberId(activeMemberRowValue(row, ["メンバーID", "メンバー ID", "メンバーＩＤ", "会員ID", "メンバー_ID", "会員番号", "memberId", "member_id"]));
    if (!memberId) {
      stats.blankMemberIdCount += 1;
      continue;
    }
    const storeRaw = String(activeMemberRowValue(row, ["所属店舗名"], { exact: true }) || "").trim();
    const joinDate = parseCounselingDate(activeMemberRowValue(row, ["入会日時"]));
    const planEndDate = parseCounselingDate(activeMemberRowValue(row, ["プラン契約適用終了日"]));
    const matchingNewMember = newMembersById.get(memberId);
    const startDate = matchingNewMember?.startDate || joinDate;
    const cancelMember = {
      memberId,
      name: String(activeMemberRowValue(row, ["氏名", "名前", "会員名", "メンバー名"]) || "").trim(),
      gender: String(activeMemberRowValue(row, ["性別"]) || "").trim(),
      age: Number(activeMemberRowValue(row, ["年齢"])) || null,
      belongingStoreName: storeRaw,
      store: matchStoreName(storeRaw) || storeRaw,
      joinDate,
      startDate,
      startMonth: monthOfIsoDate(startDate),
      planName: String(activeMemberRowValue(row, ["契約プラン名", "プラン名"]) || "").trim(),
      planContractDate: parseCounselingDate(activeMemberRowValue(row, ["プラン契約日"])),
      planStartDate: parseCounselingDate(activeMemberRowValue(row, ["プラン契約適用開始日"])),
      planEndDate,
      cancelMonth: monthOfIsoDate(planEndDate),
      startDateSource: matchingNewMember?.startDate ? "newMembers" : "cancelCsvJoinDate",
    };
    if (!cancelMember.startDate) stats.unknownStartDateCount += 1;
    if (!cancelMember.cancelMonth) stats.unknownCancelMonthCount += 1;
    if (map.has(memberId)) {
      stats.duplicateMemberIdCount += 1;
      const existing = map.get(memberId);
      const existingEnd = existing.planEndDate || "";
      const incomingEnd = cancelMember.planEndDate || "";
      console.warn("[counseling] duplicate cancel member id; selecting latest plan end date or later row", memberId);
      if (incomingEnd < existingEnd) continue;
    }
    map.set(memberId, cancelMember);
  }
  const rows = [...map.values()];
  stats.validCount = rows.length;
  stats.excludedCount = stats.rowCount - stats.validCount;
  return { rows, stats };
}
function counselingStatusIsCheckedIn(status) {
  return counselingReservationIsPerformed({ reservationStatus: status });
}
function counselingStatusIsReserved(status) {
  if (counselingStatusIsCanceled(status)) return false;
  const s = normalizedCounselingStatus(status);
  return counselingStatusIsCheckedIn(status) || s === "予約済み" || s === "予約";
}
function counselingTicketStage(ticketRaw) {
  const ticket = normalizeCounselingTicketName(ticketRaw);
  if (ticket === "初回カウンセリング") return 1;
  if (ticket === "2回目カウンセリング") return 2;
  if (ticket === "3回目カウンセリング") return 3;
  if (ticket === "4回目以降カウンセリング") return 4;
  return 0;
}
function counselingStageLabel(stage) {
  const key = stage >= 4 ? 4 : stage || 0;
  return COUNSELING_STAGE_LABELS[key] || "初回未実施";
}
function nextCounselingName(stage) {
  if (stage <= 0) return "初回カウンセリング";
  if (stage === 1) return "2回目カウンセリング";
  if (stage === 2) return "3回目カウンセリング";
  if (stage === 3) return "4回目以降カウンセリング";
  return "対応不要 / 継続フォロー";
}
function latestCounselingRow(rows) {
  return [...rows].sort((a, b) => {
    const d = String(b.lessonDate || "").localeCompare(String(a.lessonDate || ""));
    if (d) return d;
    return String(b.startTime || "").localeCompare(String(a.startTime || ""));
  })[0] || null;
}
function buildActiveCounselingProgress(activeMembersValue, reservationsValue) {
  const reservationsByMember = new Map();
  for (const r of normalizeCounselingReservations(reservationsValue)) {
    if (!r?.memberId || !isCounselingTicket(r.ticket)) continue;
    if (!reservationsByMember.has(r.memberId)) reservationsByMember.set(r.memberId, []);
    reservationsByMember.get(r.memberId).push(r);
  }
  return normalizeCounselingActiveMembers(activeMembersValue).map((member) => {
    const memberReservations = reservationsByMember.get(member.memberId) || [];
    const checkedIn = memberReservations.filter((r) => counselingStatusIsCheckedIn(r.reservationStatus));
    const reservedIncluded = memberReservations.filter((r) => counselingStatusIsReserved(r.reservationStatus));
    const checkedStage = Math.max(0, ...checkedIn.map((r) => counselingTicketStage(r.ticket)));
    const reservedStage = Math.max(0, ...reservedIncluded.map((r) => counselingTicketStage(r.ticket)));
    const checkedByStage = {};
    for (const r of checkedIn) {
      const stage = counselingTicketStage(r.ticket);
      if (!stage) continue;
      const key = Math.min(stage, 4);
      const current = checkedByStage[key];
      if (!current || String(r.lessonDate || "").localeCompare(String(current.lessonDate || "")) > 0) checkedByStage[key] = r;
    }
    const latest = latestCounselingRow(checkedIn);
    return {
      ...member,
      checkedStage,
      reservedStage,
      finalCounselingDate: latest?.lessonDate || null,
      nextCounseling: nextCounselingName(checkedStage),
      firstCounselingDate: checkedByStage[1]?.lessonDate || null,
      secondCounselingDate: checkedByStage[2]?.lessonDate || null,
      thirdCounselingDate: checkedByStage[3]?.lessonDate || null,
      fourthPlusCounselingDate: checkedByStage[4]?.lessonDate || null,
      finalCounselingName: latest?.ticket || "",
      finalCounselingStartTime: latest?.startTime || "",
      finalCounselingStaffName: latest?.staffName || "",
    };
  }).sort((a, b) => (
    (a.checkedStage - b.checkedStage) ||
    String(a.startDate || "9999-99-99").localeCompare(String(b.startDate || "9999-99-99")) ||
    (a.statusCategory === "退会予定" ? -1 : b.statusCategory === "退会予定" ? 1 : 0) ||
    String(a.memberId).localeCompare(String(b.memberId))
  ));
}
function buildNewMemberCounselingProgress(newMembersValue, reservationsValue) {
  const reservationsByMember = new Map();
  for (const r of normalizeCounselingReservations(reservationsValue)) {
    if (!r?.memberId || !isCounselingTicket(r.ticket)) continue;
    if (!reservationsByMember.has(r.memberId)) reservationsByMember.set(r.memberId, []);
    reservationsByMember.get(r.memberId).push(r);
  }
  return normalizeCounselingNewMembers(newMembersValue).map((member) => {
    const memberReservations = reservationsByMember.get(member.memberId) || [];
    const checkedIn = memberReservations.filter((r) => counselingStatusIsCheckedIn(r.reservationStatus));
    const reservedIncluded = memberReservations.filter((r) => counselingStatusIsReserved(r.reservationStatus));
    const checkedStage = Math.max(0, ...checkedIn.map((r) => counselingTicketStage(r.ticket)));
    const reservedStage = Math.max(0, ...reservedIncluded.map((r) => counselingTicketStage(r.ticket)));
    const checkedByStage = {};
    for (const r of checkedIn) {
      const stage = counselingTicketStage(r.ticket);
      if (!stage) continue;
      const key = Math.min(stage, 4);
      const current = checkedByStage[key];
      if (!current || String(r.lessonDate || "").localeCompare(String(current.lessonDate || "")) > 0) checkedByStage[key] = r;
    }
    const latest = latestCounselingRow(checkedIn);
    return {
      ...member,
      checkedStage,
      reservedStage,
      finalCounselingDate: latest?.lessonDate || null,
      nextCounseling: nextCounselingName(checkedStage),
      firstCounselingDate: checkedByStage[1]?.lessonDate || null,
      secondCounselingDate: checkedByStage[2]?.lessonDate || null,
      thirdCounselingDate: checkedByStage[3]?.lessonDate || null,
      fourthPlusCounselingDate: checkedByStage[4]?.lessonDate || null,
      finalCounselingName: latest?.ticket || "",
      finalCounselingStartTime: latest?.startTime || "",
      finalCounselingStaffName: latest?.staffName || "",
    };
  }).sort((a, b) => (
    (a.checkedStage - b.checkedStage) ||
    String(a.startDate || "9999-99-99").localeCompare(String(b.startDate || "9999-99-99")) ||
    String(a.memberId).localeCompare(String(b.memberId))
  ));
}
function buildCancelMemberCounselingProgress(cancelMembersValue, reservationsValue) {
  const reservationsByMember = new Map();
  for (const r of normalizeCounselingReservations(reservationsValue)) {
    if (!r?.memberId || !isCounselingTicket(r.ticket)) continue;
    if (!reservationsByMember.has(r.memberId)) reservationsByMember.set(r.memberId, []);
    reservationsByMember.get(r.memberId).push(r);
  }
  return normalizeCounselingCancelMembers(cancelMembersValue).map((member) => {
    const memberReservations = reservationsByMember.get(member.memberId) || [];
    const checkedIn = memberReservations.filter((r) => counselingStatusIsCheckedIn(r.reservationStatus));
    const reservedIncluded = memberReservations.filter((r) => counselingStatusIsReserved(r.reservationStatus));
    const checkedStage = Math.max(0, ...checkedIn.map((r) => counselingTicketStage(r.ticket)));
    const reservedStage = Math.max(0, ...reservedIncluded.map((r) => counselingTicketStage(r.ticket)));
    const checkedByStage = {};
    for (const r of checkedIn) {
      const stage = counselingTicketStage(r.ticket);
      if (!stage) continue;
      const key = Math.min(stage, 4);
      const current = checkedByStage[key];
      if (!current || String(r.lessonDate || "").localeCompare(String(current.lessonDate || "")) > 0) checkedByStage[key] = r;
    }
    const latest = latestCounselingRow(checkedIn);
    return {
      ...member,
      checkedStage,
      reservedStage,
      finalCounselingDate: latest?.lessonDate || null,
      nextCounseling: nextCounselingName(checkedStage),
      firstCounselingDate: checkedByStage[1]?.lessonDate || null,
      secondCounselingDate: checkedByStage[2]?.lessonDate || null,
      thirdCounselingDate: checkedByStage[3]?.lessonDate || null,
      fourthPlusCounselingDate: checkedByStage[4]?.lessonDate || null,
      finalCounselingName: latest?.ticket || "",
      finalCounselingStartTime: latest?.startTime || "",
      finalCounselingStaffName: latest?.staffName || "",
    };
  }).sort((a, b) => (
    (a.checkedStage - b.checkedStage) ||
    String(b.planEndDate || "").localeCompare(String(a.planEndDate || "")) ||
    String(a.memberId).localeCompare(String(b.memberId))
  ));
}
function cancellationRowsOf(data) {
  const value = data?.cancellations;
  if (Array.isArray(value)) return value;
  return Array.isArray(value?.rows) ? value.rows : [];
}
function countCancellations(rows, year, month) {
  const ym = `${year}-${String(month).padStart(2, "0")}`;
  const result = { all: 0 };
  for (const s of STORE_KEYS) result[s] = 0;
  for (const row of rows) {
    if (cancellationMonthOf(row) !== ym) continue;
    result.all += 1;
    const store = matchStoreName(row.store || "");
    if (STORE_KEYS.includes(store)) result[store] += 1;
  }
  return result;
}
function monthlyCancellationRows(rows) {
  const map = new Map();
  for (const row of rows) {
    const ym = cancellationMonthOf(row);
    if (!ym) continue;
    if (!map.has(ym)) {
      const [year, month] = ym.split("-").map(Number);
      const base = { ym, year, month, all: 0 };
      for (const s of STORE_KEYS) base[s] = 0;
      map.set(ym, base);
    }
    const rec = map.get(ym);
    rec.all += 1;
    const store = matchStoreName(row.store || "");
    if (STORE_KEYS.includes(store)) rec[store] += 1;
  }
  return [...map.values()].sort((a, b) => b.ym.localeCompare(a.ym));
}
function latestCancellationYearMonth(rows) {
  const monthly = monthlyCancellationRows(rows);
  if (monthly.length) return { year: monthly[0].year, month: monthly[0].month };
  return todayParts();
}
function weeklyCancellationRequestRows(rows, year, month) {
  const weeks = [
    { label: "1〜7日", dayFrom: 1, dayTo: 7 },
    { label: "8〜14日", dayFrom: 8, dayTo: 14 },
    { label: "15〜21日", dayFrom: 15, dayTo: 21 },
    { label: "22日〜月末", dayFrom: 22, dayTo: daysInMonth(year, month) },
  ].map((week) => {
    const rec = { ...week, all: 0 };
    for (const s of STORE_KEYS) rec[s] = 0;
    return rec;
  });
  for (const row of rows) {
    const d = parseDate(row?.cancellationRequestDate);
    if (!d) continue;
    if (d.getFullYear() !== year || d.getMonth() + 1 !== month) continue;
    const day = d.getDate();
    const week = weeks.find((w) => day >= w.dayFrom && day <= w.dayTo);
    if (!week) continue;
    week.all += 1;
    const store = matchStoreName(row.store || "");
    if (STORE_KEYS.includes(store)) week[store] += 1;
  }
  return weeks;
}
function medianOf(values) {
  if (!values.length) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}
function cancellationTenureAnalysis(rows, year, month) {
  const ym = `${year}-${String(month).padStart(2, "0")}`;
  const bandLabels = ["3ヶ月以内", "4〜6ヶ月", "7〜12ヶ月", "13ヶ月以上"];
  const bands = bandLabels.map((label) => {
    const rec = { label, all: 0 };
    for (const s of STORE_KEYS) rec[s] = 0;
    return rec;
  });
  const values = { all: [] };
  for (const s of STORE_KEYS) values[s] = [];

  for (const row of rows) {
    if (cancellationMonthOf(row) !== ym) continue;
    const tenureMonths = cancellationTenureMonths(row);
    const band = cancellationTenureBand(row);
    if (!band) continue;
    const rec = bands.find((b) => b.label === band);
    if (!rec) continue;
    rec.all += 1;
    values.all.push(tenureMonths);
    const store = matchStoreName(row.store || "");
    if (STORE_KEYS.includes(store)) {
      rec[store] += 1;
      values[store].push(tenureMonths);
    }
  }

  const stats = {};
  for (const key of ["all", ...STORE_KEYS]) {
    const list = values[key];
    stats[key] = {
      count: list.length,
      avg: list.length ? list.reduce((sum, v) => sum + v, 0) / list.length : null,
      median: medianOf(list),
    };
  }
  return { bands, stats };
}
function cancellationTenureAgeBandOf(age) {
  if (age == null || age === "") return "年齢不明";
  const n = Number(age);
  if (!Number.isFinite(n) || n < 10) return "年齢不明";
  if (n < 20) return "10代";
  if (n < 30) return "20代";
  if (n < 40) return "30代";
  if (n < 50) return "40代";
  if (n < 60) return "50代";
  if (n < 70) return "60代";
  return "70代以上";
}
function cancellationAgeTenureAnalysis(rows, year, month) {
  const ym = `${year}-${String(month).padStart(2, "0")}`;
  const ageLabels = ["10代", "20代", "30代", "40代", "50代", "60代", "70代以上", "年齢不明"];
  const bandLabels = ["3ヶ月以内", "4〜6ヶ月", "7〜12ヶ月", "13ヶ月以上"];
  const ageRows = ageLabels.map((label) => ({
    label,
    count: 0,
    values: [],
    ...Object.fromEntries(bandLabels.map((band) => [band, 0])),
  }));
  let excludedCount = 0;

  for (const row of rows) {
    if (cancellationMonthOf(row) !== ym) continue;
    const tenureMonths = cancellationTenureMonths(row);
    const band = cancellationTenureBand(row);
    if (!band) {
      excludedCount += 1;
      continue;
    }
    const ageBand = cancellationTenureAgeBandOf(row.age);
    const rec = ageRows.find((item) => item.label === ageBand);
    if (!rec) continue;
    rec.count += 1;
    rec.values.push(tenureMonths);
    rec[band] += 1;
  }

  return {
    rows: ageRows.map(({ values, ...row }) => ({
      ...row,
      avg: values.length ? values.reduce((sum, v) => sum + v, 0) / values.length : null,
      median: medianOf(values),
    })),
    excludedCount,
  };
}
function cancellationAgeGroupOf(age) {
  if (age == null || age === "") return "年齢不明";
  const n = Number(age);
  if (!Number.isFinite(n)) return "年齢不明";
  if (n < 30) return "20代以下";
  if (n < 40) return "30代";
  if (n < 50) return "40代";
  if (n < 60) return "50代";
  return "60代以上";
}
function cancellationGenderGroupOf(gender) {
  const value = String(gender || "").trim();
  if (!value) return "性別不明";
  if (value.includes("女")) return "女性";
  if (value.includes("男")) return "男性";
  if (value === "その他") return "その他";
  return "その他";
}
function cancellationAttributeBreakdown(rows, year, month) {
  const ym = `${year}-${String(month).padStart(2, "0")}`;
  const makeRows = (labels) => labels.map((label) => {
    const rec = { label, all: 0 };
    for (const s of STORE_KEYS) rec[s] = 0;
    return rec;
  });
  const ageRows = makeRows(["20代以下", "30代", "40代", "50代", "60代以上", "年齢不明"]);
  const genderRows = makeRows(["女性", "男性", "その他", "性別不明"]);
  const addTo = (list, label, row) => {
    const rec = list.find((r) => r.label === label);
    if (!rec) return;
    rec.all += 1;
    const store = matchStoreName(row.store || "");
    if (STORE_KEYS.includes(store)) rec[store] += 1;
  };

  for (const row of rows) {
    if (cancellationMonthOf(row) !== ym) continue;
    addTo(ageRows, cancellationAgeGroupOf(row.age), row);
    addTo(genderRows, cancellationGenderGroupOf(row.gender), row);
  }
  return { ageRows, genderRows };
}
function cancellationYm(year, month) {
  return `${year}-${String(month).padStart(2, "0")}`;
}
function cancellationYmIndex(ym) {
  const [year, month] = String(ym || "").split("-").map(Number);
  if (!year || !month) return null;
  return year * 12 + month - 1;
}
function cancellationYmFromIndex(index) {
  const year = Math.floor(index / 12);
  const month = (index % 12) + 1;
  return cancellationYm(year, month);
}
function cancellationPeriodMonths(startYm, endYm) {
  const start = cancellationYmIndex(startYm);
  const end = cancellationYmIndex(endYm);
  if (start == null || end == null) return [];
  const from = Math.min(start, end);
  const to = Math.max(start, end);
  const months = [];
  for (let i = from; i <= to; i += 1) months.push(cancellationYmFromIndex(i));
  return months;
}
function cancellationPeriodFromMode(mode, customStartYm, customEndYm, rows) {
  const today = todayParts();
  const currentYm = cancellationYm(today.year, today.month);
  const currentIdx = cancellationYmIndex(currentYm);
  const previousYm = cancellationYmFromIndex(currentIdx - 1);
  const rowMonths = monthlyCancellationRows(rows).map((r) => r.ym).sort();
  const allStart = rowMonths[0] || currentYm;
  const allEnd = rowMonths[rowMonths.length - 1] || currentYm;
  if (mode === "all") {
    return { mode, startYm: allStart, endYm: allEnd, months: cancellationPeriodMonths(allStart, allEnd), label: "全期間" };
  }
  if (mode === "previous") {
    return { mode, startYm: previousYm, endYm: previousYm, months: [previousYm], label: cancellationMonthLabel(previousYm) };
  }
  if (mode === "recent3" || mode === "recent6") {
    const size = mode === "recent3" ? 3 : 6;
    const startYm = cancellationYmFromIndex(currentIdx - (size - 1));
    return { mode, startYm, endYm: currentYm, months: cancellationPeriodMonths(startYm, currentYm), label: `${cancellationMonthLabel(startYm)}〜${cancellationMonthLabel(currentYm)}` };
  }
  if (mode === "custom") {
    const start = customStartYm || allStart;
    const end = customEndYm || customStartYm || allEnd;
    const startIdx = cancellationYmIndex(start);
    const endIdx = cancellationYmIndex(end);
    const startYm = startIdx != null && endIdx != null && startIdx > endIdx ? end : start;
    const endYm = startIdx != null && endIdx != null && startIdx > endIdx ? start : end;
    const months = cancellationPeriodMonths(startYm, endYm);
    return { mode, startYm, endYm, months, label: startYm === endYm ? cancellationMonthLabel(startYm) : `${cancellationMonthLabel(startYm)}〜${cancellationMonthLabel(endYm)}` };
  }
  return { mode: "current", startYm: currentYm, endYm: currentYm, months: [currentYm], label: cancellationMonthLabel(currentYm) };
}
function cancellationRowsInPeriod(rows, period) {
  if (period.mode === "all") return rows;
  const start = cancellationYmIndex(period.startYm);
  const end = cancellationYmIndex(period.endYm);
  return rows.filter((row) => {
    const idx = cancellationYmIndex(cancellationMonthOf(row));
    return idx != null && idx >= start && idx <= end;
  });
}
function cancellationRowsForStore(rows, storeFilter) {
  if (!storeFilter || storeFilter === "all") return rows;
  return rows.filter((row) => matchStoreName(row?.store || "") === storeFilter);
}
function cancellationRowsAsSingleMonth(rows) {
  return rows.map((row) => ({ ...row, cancellationMonth: "2000-01" }));
}
const CANCELLATION_SURVEY_ENVIRONMENT_REASONS = [
  "転居・転勤",
  "ケガ・病気",
  "妊娠",
  "仕事が忙しいため",
  "家庭の事情（子育て・介護）",
  "在宅勤務が減り、時間がつくりにくい",
  "営業時間が合わない",
  "自宅・勤務地から遠い",
  "その他",
];
const CANCELLATION_SURVEY_SERVICE_REASONS = [
  "自分に合った運動ができなかった",
  "思ったより短い時間で効率的な運動ができなかった",
  "マシンの使い方が分からなかった",
  "必要なときにスタッフに相談できなかった",
  "運動の成果が感じられなかった",
  "目標達成のための専門的なアドバイスが得られなかった",
  "飽きた",
  "一人では続けられなかった",
  "混雑によるストレス",
  "人間関係のトラブルがあった",
  "目標を達成した",
  "運動習慣がついたので自分で頑張ってみる",
  "他のジム・スポーツクラブに切り替える",
  "スタッフの対応で気になる点があった",
  "その他",
];
const CANCELLATION_SURVEY_AGE_FILTERS = [
  { key: "all", label: "全年代" },
  { key: "10代以下", label: "10代以下" },
  { key: "20代", label: "20代" },
  { key: "30代", label: "30代" },
  { key: "40代", label: "40代" },
  { key: "50代", label: "50代" },
  { key: "60代以上", label: "60代以上" },
];
const CANCELLATION_SURVEY_AGE_ROWS = ["10代以下", "20代", "30代", "40代", "50代", "60代以上", "年齢不明"];
function emptyCancellationSurvey() {
  return { rows: [], imports: [], meta: { lastImportedAt: null, lastFileName: null, rowCount: 0, validCount: 0, registeredMonths: [] } };
}
function normalizeCancellationSurvey(value) {
  if (Array.isArray(value)) return { ...emptyCancellationSurvey(), rows: value };
  if (!value || typeof value !== "object") return emptyCancellationSurvey();
  const rows = Array.isArray(value.rows) ? value.rows : [];
  const imports = Array.isArray(value.imports) ? value.imports : [];
  return { rows, imports, meta: { ...emptyCancellationSurvey().meta, ...(value.meta || {}) } };
}
function cancellationSurveyStoreFromCode(codeRaw) {
  const code = String(codeRaw || "").trim().toUpperCase();
  if (code.includes("S0001") || code.includes("梅ヶ丘")) return "梅ヶ丘";
  if (code.includes("S0002") || code.includes("狛江")) return "狛江";
  return "不明";
}
function cancellationSurveyAgeBand(age) {
  if (age == null || age === "") return "年齢不明";
  const n = Number(age);
  if (!Number.isFinite(n)) return "年齢不明";
  if (n < 20) return "10代以下";
  if (n < 30) return "20代";
  if (n < 40) return "30代";
  if (n < 50) return "40代";
  if (n < 60) return "50代";
  return "60代以上";
}
function cancellationSurveyHasAnswer(value) {
  const s = String(value ?? "").trim();
  return s !== "" && s.toLowerCase() !== "nan";
}
function cancellationSurveyReasonFromHeader(header) {
  const h = String(header || "").trim();
  const idx = h.lastIndexOf("_");
  return idx >= 0 ? h.slice(idx + 1).trim() : "";
}
function cancellationSurveyReasonColumns(row, type) {
  return Object.keys(row || {}).filter((key) => {
    const h = String(key || "").trim();
    if (type === "environment") return h.startsWith("退会される理由は何ですか？（環境要因）_") || (h.includes("退会される理由") && h.includes("環境要因") && h.includes("_"));
    return h.startsWith("上記の環境要因がなくても退会を考えていた場合は、その理由を教えてください。") || (h.includes("環境要因がなくても退会を考えていた場合") && h.includes("理由") && h.includes("_"));
  });
}
function cancellationSurveySelectedReasons(row, type, preferredOrder) {
  const selected = [];
  for (const key of cancellationSurveyReasonColumns(row, type)) {
    if (!cancellationSurveyHasAnswer(row[key])) continue;
    const reason = cancellationSurveyReasonFromHeader(key) || String(row[key]).trim();
    if (reason && !selected.includes(reason)) selected.push(reason);
  }
  return [...selected].sort((a, b) => {
    const ai = preferredOrder.indexOf(a);
    const bi = preferredOrder.indexOf(b);
    if (ai >= 0 && bi >= 0) return ai - bi;
    if (ai >= 0) return -1;
    if (bi >= 0) return 1;
    return a.localeCompare(b, "ja");
  });
}
function cancellationSurveyMailAllowed(value) {
  const s = String(value || "").trim();
  if (!s || /いいえ|不可|不要|拒否|希望しない/.test(s)) return false;
  return /はい|可|許可|希望|送/.test(s);
}
function sanitizeCancellationSurveyRaw(row) {
  return Object.fromEntries(Object.entries(row || {}).filter(([key]) => !String(key).includes("メールアドレス")));
}
function cancellationSurveyDedupKey(row) {
  const memberId = normalizeMemberId(rowValue(row, ["メンバー_ID", "メンバーID", "メンバー ID"]));
  const registeredAt = String(rowValue(row, ["登録日時"]) || "").trim();
  if (memberId && registeredAt) return `${memberId}__${registeredAt}`;
  const code = String(rowValue(row, ["コード"]) || "").trim();
  const name = String(rowValue(row, ["メンバー_氏名", "氏名", "名称"]) || "").trim();
  if (code || registeredAt || name) return `${code}__${registeredAt || ""}__${name}`;
  return "";
}
function monthlyCancellationSurveyCounts(rows) {
  const counts = {};
  for (const row of rows || []) {
    if (!row.registeredMonth) continue;
    counts[row.registeredMonth] = (counts[row.registeredMonth] || 0) + 1;
  }
  return Object.entries(counts).map(([ym, count]) => ({ ym, count })).sort((a, b) => b.ym.localeCompare(a.ym));
}
function parseCancellationSurveyRows(rawRows, filename = "") {
  const map = new Map();
  let skipped = 0;
  for (const row of rawRows || []) {
    const key = cancellationSurveyDedupKey(row);
    if (!key) {
      skipped += 1;
      continue;
    }
    const storeRaw = String(rowValue(row, ["店舗コード"]) || "").trim();
    const registeredAt = String(rowValue(row, ["登録日時"]) || "").trim();
    const registeredDate = parseFlexibleDate(registeredAt);
    const age = Number(rowValue(row, ["メンバー_年齢", "年齢"])) || null;
    map.set(key, {
      memberId: normalizeMemberId(rowValue(row, ["メンバー_ID", "メンバーID", "メンバー ID"])),
      memberName: String(rowValue(row, ["メンバー_氏名", "氏名", "名称"]) || "").trim(),
      gender: String(rowValue(row, ["メンバー_性別", "性別"]) || "").trim(),
      age,
      registeredAt,
      registeredMonth: monthOfIsoDate(registeredDate),
      storeRaw,
      store: cancellationSurveyStoreFromCode(storeRaw),
      environmentReasons: cancellationSurveySelectedReasons(row, "environment", CANCELLATION_SURVEY_ENVIRONMENT_REASONS),
      serviceReasons: cancellationSurveySelectedReasons(row, "service", CANCELLATION_SURVEY_SERVICE_REASONS),
      freeText: String(rowValue(row, ["その他（自由記述）"]) || "").trim(),
      detailText: String(rowValue(row, ["「スタッフの対応で気になる点があった」「その他」を選択した方へ　具体的な内容を教えてください。", "スタッフの対応で気になる点があった", "具体的な内容を教えてください"]) || "").trim(),
      mailPermission: String(rowValue(row, ["今後、再入会や健康増進イベント等の案内をメールでお送りしてもよろしいですか？", "再入会や健康増進イベント"]) || "").trim(),
      raw: sanitizeCancellationSurveyRaw(row),
    });
  }
  const rows = [...map.values()];
  const registeredMonths = monthlyCancellationSurveyCounts(rows);
  return {
    rows,
    skipped,
    meta: {
      lastImportedAt: new Date().toISOString(),
      lastFileName: filename || "貼り付け入力",
      rowCount: rawRows?.length || 0,
      validCount: rows.length,
      registeredMonths,
    },
  };
}
function replaceCancellationSurveyImport(parsed) {
  return {
    rows: parsed.rows || [],
    imports: [{ ...(parsed.meta || {}), importedAt: parsed.meta?.lastImportedAt }],
    meta: parsed.meta || emptyCancellationSurvey().meta,
  };
}
function cancellationSurveyPeriodFromMode(mode, customStartYm, customEndYm, rows) {
  const today = todayParts();
  const currentYm = cancellationYm(today.year, today.month);
  const currentIdx = cancellationYmIndex(currentYm);
  const previousYm = cancellationYmFromIndex(currentIdx - 1);
  const rowMonths = monthlyCancellationSurveyCounts(rows).map((r) => r.ym).sort();
  const allStart = rowMonths[0] || currentYm;
  const allEnd = rowMonths[rowMonths.length - 1] || currentYm;
  if (mode === "all") return { mode, startYm: allStart, endYm: allEnd, months: cancellationPeriodMonths(allStart, allEnd), label: "全期間" };
  if (mode === "previous") return { mode, startYm: previousYm, endYm: previousYm, months: [previousYm], label: cancellationMonthLabel(previousYm) };
  if (mode === "recent3" || mode === "recent6") {
    const size = mode === "recent3" ? 3 : 6;
    const startYm = cancellationYmFromIndex(currentIdx - (size - 1));
    return { mode, startYm, endYm: currentYm, months: cancellationPeriodMonths(startYm, currentYm), label: `${cancellationMonthLabel(startYm)}〜${cancellationMonthLabel(currentYm)}` };
  }
  if (mode === "custom") {
    const start = customStartYm || allStart;
    const end = customEndYm || customStartYm || allEnd;
    const startIdx = cancellationYmIndex(start);
    const endIdx = cancellationYmIndex(end);
    const startYm = startIdx != null && endIdx != null && startIdx > endIdx ? end : start;
    const endYm = startIdx != null && endIdx != null && startIdx > endIdx ? start : end;
    return { mode, startYm, endYm, months: cancellationPeriodMonths(startYm, endYm), label: startYm === endYm ? cancellationMonthLabel(startYm) : `${cancellationMonthLabel(startYm)}〜${cancellationMonthLabel(endYm)}` };
  }
  return { mode: "current", startYm: currentYm, endYm: currentYm, months: [currentYm], label: cancellationMonthLabel(currentYm) };
}
function cancellationSurveyRowsInPeriod(rows, period) {
  if (period.mode === "all") return rows;
  const start = cancellationYmIndex(period.startYm);
  const end = cancellationYmIndex(period.endYm);
  return rows.filter((row) => {
    const idx = cancellationYmIndex(row.registeredMonth);
    return idx != null && idx >= start && idx <= end;
  });
}
function cancellationSurveyRowsForStore(rows, storeFilter) {
  if (!storeFilter || storeFilter === "all") return rows;
  return rows.filter((row) => row.store === storeFilter);
}
function cancellationSurveyRowsForAge(rows, ageFilter) {
  if (!ageFilter || ageFilter === "all") return rows;
  return rows.filter((row) => cancellationSurveyAgeBand(row.age) === ageFilter);
}
function cancellationSurveyReasonRanking(rows, reasons, field) {
  const counts = Object.fromEntries(reasons.map((reason) => [reason, 0]));
  for (const row of rows || []) {
    for (const reason of row[field] || []) counts[reason] = (counts[reason] || 0) + 1;
  }
  return Object.entries(counts)
    .map(([reason, count]) => ({ reason, count, rate: rows.length ? count / rows.length : null }))
    .sort((a, b) => (b.count - a.count) || a.reason.localeCompare(b.reason, "ja"));
}
function cancellationSurveyTopReasons(rows, limit = 3) {
  const counts = {};
  for (const row of rows || []) {
    for (const reason of [...(row.environmentReasons || []), ...(row.serviceReasons || [])]) counts[reason] = (counts[reason] || 0) + 1;
  }
  return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, limit).map(([reason, count]) => `${reason}（${num(count)}件）`);
}
function weeklyCancellationRequestRowsForPeriod(rows, period) {
  if (period.months.length === 1) {
    const [year, month] = period.months[0].split("-").map(Number);
    return weeklyCancellationRequestRows(rows, year, month);
  }
  const start = cancellationYmIndex(period.startYm);
  const end = cancellationYmIndex(period.endYm);
  const weeks = weeklyCancellationRequestRows([], 2000, 1).map((week) => {
    const rec = { ...week, all: 0 };
    for (const s of STORE_KEYS) rec[s] = 0;
    return rec;
  });
  for (const row of rows) {
    const d = parseDate(row?.cancellationRequestDate);
    if (!d) continue;
    const idx = d.getFullYear() * 12 + d.getMonth();
    if (idx < start || idx > end) continue;
    const day = d.getDate();
    const week = weeks.find((w) => day >= w.dayFrom && (w.dayFrom === 22 || day <= w.dayTo));
    if (!week) continue;
    week.all += 1;
    const store = matchStoreName(row.store || "");
    if (STORE_KEYS.includes(store)) week[store] += 1;
  }
  return weeks;
}
function confirmedCancellationCountsForPeriod(memberMonthly, period) {
  const counts = { all: null };
  for (const s of STORE_KEYS) counts[s] = null;
  const monthList = period.months || [];
  for (const key of ["all", ...STORE_KEYS]) {
    let total = 0;
    let found = false;
    for (const ym of monthList) {
      const [year, month] = ym.split("-").map(Number);
      const mm = getStoreOrAllMemberMonthly(memberMonthly, key === "all" ? null : key, year, month);
      if (mm && mm.leaves != null) {
        total += Number(mm.leaves) || 0;
        found = true;
      }
    }
    counts[key] = found ? total : null;
  }
  return counts;
}
function nextTrialId(existingTrials) {
  let max = 0;
  for (const t of existingTrials) {
    const n = Number(String(t.id).replace(/\D/g, ""));
    if (n > max) max = n;
  }
  return `t${max + 1}`;
}

// ============================================================
// フォーマット
// ============================================================
const yen = (n) => (n == null || isNaN(n) ? "—" : "¥" + Math.round(n).toLocaleString("ja-JP"));
const num = (n) => (n == null || isNaN(n) ? "—" : Math.round(n).toLocaleString("ja-JP"));
const pct1 = (n) => (n == null || isNaN(n) ? "—" : (n * 100).toFixed(1) + "%");
const signed = (n) => (n == null || isNaN(n) ? "—" : (n > 0 ? "+" : "") + Math.round(n).toLocaleString("ja-JP"));
const signedPct = (n) => (n == null || isNaN(n) ? "—" : (n > 0 ? "+" : "") + (n * 100).toFixed(1) + "%");

// ============================================================
// ストレージ層（window.storage ラッパー / shared=true で全店共有）
// ============================================================
const SK = {
  meta: "meta", staff: "staff", trials: "trials", joins: "joins",
  memberMonthly: "memberMonthly", baselines: "baselines",
  budgetTargets: "budgetTargets", revenueActuals: "revenueActuals", settings: "settings",
  cancellations: "cancellations",
  cancellationSurvey: "cancellationSurvey",
  counselingReservations: "counseling:reservations",
  counselingMeta: "counseling:meta",
  counselingActiveMembers: "counseling:activeMembers",
  counselingNewMembers: "counseling:newMembers",
  counselingCancelMembers: "counseling:cancelMembers",
  aiAssistantSettings: "aiAssistantSettings",
};
function withTimeout(promise, ms, label) {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error("timeout:" + label)), ms);
    promise.then((v) => { clearTimeout(t); resolve(v); }, (e) => { clearTimeout(t); reject(e); });
  });
}
async function sGet(key) {
  try {
    const r = await withTimeout(window.storage.get(key, true), 8000, "get:" + key);
    return r ? JSON.parse(r.value) : null;
  } catch (e) {
    if (new URLSearchParams(window.location.search).get("debugStorage") === "1") {
      console.warn("[storage] sGet failed", key, e);
    }
    return null;
  }
}
async function sSet(key, value) {
  try {
    const r = await withTimeout(window.storage.set(key, JSON.stringify(value), true), 8000, "set:" + key);
    return !!r;
  } catch (e) {
    console.warn("[storage] sSet failed", key, e);
    return false;
  }
}
async function ensureSeeded() {
  const meta = await sGet(SK.meta);
  if (meta && meta.initialized) return false;
  // 一括並列ではなく順番に書き込む（同時書き込みによる失敗を避けるため）
  for (const k of ["staff", "trials", "joins", "memberMonthly", "baselines", "budgetTargets", "revenueActuals", "settings"]) {
    await sSet(SK[k], SEED_DATA[k]);
  }
  await sSet(SK.meta, { initialized: true, seededAt: new Date().toISOString(), version: 1 });
  return true;
}
async function loadAllData() {
  const [staff, trials, joins, memberMonthly, baselines, budgetTargets, revenueActuals, settings, cancellations, cancellationSurvey, counselingReservations, counselingMeta, counselingActiveMembers, counselingNewMembers, counselingCancelMembers, aiAssistantSettings] = await Promise.all([
    sGet(SK.staff), sGet(SK.trials), sGet(SK.joins), sGet(SK.memberMonthly),
    sGet(SK.baselines), sGet(SK.budgetTargets), sGet(SK.revenueActuals), sGet(SK.settings),
    sGet(SK.cancellations), sGet(SK.cancellationSurvey), sGet(SK.counselingReservations), sGet(SK.counselingMeta), sGet(SK.counselingActiveMembers), sGet(SK.counselingNewMembers), sGet(SK.counselingCancelMembers),
    sGet(SK.aiAssistantSettings),
  ]);
  return {
    staff: staff || SEED_DATA.staff,
    trials: trials || SEED_DATA.trials,
    joins: joins || SEED_DATA.joins,
    memberMonthly: memberMonthly || SEED_DATA.memberMonthly,
    baselines: baselines || SEED_DATA.baselines,
    budgetTargets: budgetTargets || SEED_DATA.budgetTargets,
    revenueActuals: revenueActuals || SEED_DATA.revenueActuals,
    settings: settings || SEED_DATA.settings,
    cancellations: cancellations || { rows: [], importedAt: null, source: null },
    cancellationSurvey: normalizeCancellationSurvey(cancellationSurvey),
    counselingReservations: normalizeCounselingReservations(counselingReservations),
    counselingMeta: normalizeCounselingMeta(counselingMeta),
    counselingActiveMembers: counselingActiveMembers && typeof counselingActiveMembers === "object" && !Array.isArray(counselingActiveMembers)
      ? { rows: normalizeCounselingActiveMembers(counselingActiveMembers), meta: normalizeCounselingActiveMembersMeta(counselingActiveMembers) }
      : normalizeCounselingActiveMembers(counselingActiveMembers),
    counselingNewMembers: counselingNewMembers && typeof counselingNewMembers === "object" && !Array.isArray(counselingNewMembers)
      ? { rows: normalizeCounselingNewMembers(counselingNewMembers), imports: normalizeCounselingMemberImports(counselingNewMembers), meta: normalizeCounselingNewMembersMeta(counselingNewMembers) }
      : normalizeCounselingNewMembers(counselingNewMembers),
    counselingCancelMembers: counselingCancelMembers && typeof counselingCancelMembers === "object" && !Array.isArray(counselingCancelMembers)
      ? { rows: normalizeCounselingCancelMembers(counselingCancelMembers), imports: normalizeCounselingMemberImports(counselingCancelMembers), meta: normalizeCounselingCancelMembersMeta(counselingCancelMembers) }
      : normalizeCounselingCancelMembers(counselingCancelMembers),
    aiAssistantSettings: normalizeAiAssistantSettings(aiAssistantSettings),
  };
}
// read-modify-write: 同時編集での上書きリスクを下げる
async function mutate(key, mutateFn) {
  const storageKey = SK[key] || key;
  const current = await sGet(storageKey);
  const base = current == null ? SEED_DATA[key] : current;
  const next = mutateFn(base);
  const saved = await sSet(storageKey, next);
  if (!saved) throw new Error("storage set failed:" + storageKey);
  if (storageKey.startsWith("counseling:")) {
    const confirmed = await sGet(storageKey);
    if (confirmed == null && next != null) throw new Error("storage readback failed:" + storageKey);
    return confirmed == null ? next : confirmed;
  }
  return next;
}

const AI_NG_CONDITIONS_LEGACY = [
  { id: "no_weak_basis", label: "数値根拠が弱い提案をしない" },
  { id: "no_vague_staffing", label: "「声かけ徹底」だけの曖昧な施策にしない" },
  { id: "kpi_required", label: "対象者・工数・KPI・期限を明記する" },
  { id: "store_difference", label: "店舗差を無視しない" },
  { id: "no_pii", label: "個人名・会員ID・メール・電話番号を含めない" },
  { id: "no_raw_text", label: "自由記述や詳細記述の原文を含めない" },
  { id: "unknown_is_shortage", label: "不明点は推測せずデータ不足と明記する" },
];
const AI_NG_CONDITIONS = [
  { id: "no_extra_staff", label: "追加人員・新規採用を前提とした施策は提案しない" },
  { id: "no_daily_operation", label: "毎日運用が必要な施策は提案しない" },
  { id: "no_extra_budget", label: "追加予算が必要な施策は提案しない" },
  { id: "no_hours_change", label: "営業時間変更を前提とした施策は提案しない" },
  { id: "no_phone_main", label: "電話対応を主軸にした施策は原則提案しない" },
  { id: "no_heavy_training", label: "スタッフ教育負荷が重すぎる施策は提案しない" },
  { id: "no_event_required", label: "イベント開催を前提とした施策は提案しない" },
  { id: "no_vague_staffing", label: "根性論・声かけ徹底だけの施策は提案しない" },
  { id: "no_weak_basis", label: "数値根拠が弱い施策は提案しない" },
  { id: "store_difference", label: "店舗別の違いを無視した施策は提案しない" },
  { id: "kpi_required", label: "検証KPIがない施策は提案しない" },
  { id: "no_major_ops_change", label: "既存オペレーションを大きく崩す施策は提案しない" },
  { id: "no_pii", label: "退会者・会員の個人情報を外部AIに渡す前提の施策は提案しない" },
  { id: "no_raw_text", label: "現場スタッフの主観記録や自由記述に依存しすぎる施策は提案しない" },
  { id: "no_one_shot", label: "1回きりで終わり、継続検証できない施策は提案しない" },
];
const AI_ASSISTANT_STORE_FIELDS = [
  ["storeName", "店舗名"],
  ["hours", "営業時間"],
  ["closedDays", "休館日"],
  ["staffedHours", "有人時間"],
  ["unstaffedHours", "無人時間"],
  ["targetCustomers", "主な対象顧客"],
  ["facilityConstraints", "設備・運用制約"],
  ["memo", "メモ"],
];
const AI_ASSISTANT_RESOURCE_FIELDS = [
  ["extraWorkHours", "今月追加で使える工数"],
  ["staffingCapacity", "スタッフ余力"],
  ["priorityIssues", "優先課題"],
  ["temporaryStaffingChanges", "一時的な人員変更"],
  ["cannotDoThisMonth", "今月できないこと"],
  ["memo", "メモ"],
];
const AI_ASSISTANT_MODE_TEMPLATES = {
  A: "あなたは4H fitnessの退会抑止施策を検証する分析アシスタントです。添付の集計データだけを根拠に、実行可能な施策案を優先順位付きで提案してください。",
  B: "あなたは4H fitnessの退会抑止施策を検証するレビュアーです。貼り付けられた外部レポートを、添付の集計データと店舗制約に照らして検証してください。",
};
function defaultAiAssistantSettings() {
  return {
    stores: Object.fromEntries(STORE_KEYS.map((store) => [store, {
      storeName: store,
      hours: "",
      closedDays: "",
      staffedHours: "",
      unstaffedHours: "",
      targetCustomers: "",
      facilityConstraints: "",
      memo: "",
    }])),
    monthlyResource: {
      extraWorkHours: "",
      staffingCapacity: "",
      priorityIssues: "",
      temporaryStaffingChanges: "",
      cannotDoThisMonth: "",
      memo: "",
    },
    ngConditions: Object.fromEntries(AI_NG_CONDITIONS.map((item) => [item.id, true])),
    templates: { ...AI_ASSISTANT_MODE_TEMPLATES },
  };
}
function normalizeAiAssistantSettings(value) {
  const base = defaultAiAssistantSettings();
  const src = value && typeof value === "object" ? value : {};
  const stores = { ...base.stores };
  for (const store of STORE_KEYS) {
    stores[store] = { ...base.stores[store], ...(src.stores?.[store] || {}) };
    if (!stores[store].storeName) stores[store].storeName = store;
  }
  return {
    stores,
    monthlyResource: { ...base.monthlyResource, ...(src.monthlyResource || {}) },
    ngConditions: Object.fromEntries(AI_NG_CONDITIONS.map((item) => [item.id, src.ngConditions?.[item.id] ?? base.ngConditions[item.id]])),
    templates: { ...base.templates, ...(src.templates || {}) },
  };
}
function aiPct(count, total) {
  return total ? `${((count / total) * 100).toFixed(1)}%` : "-";
}
function aiCountLine(label, count, total) {
  return `- ${label}: ${num(count)}件 (${aiPct(count, total)})`;
}
function aiMonthLine(row) {
  const stores = STORE_KEYS.map((store) => `${store} ${num(row[store] || 0)}件`).join(" / ");
  return `- ${row.ym}: 全店 ${num(row.all || 0)}件 / ${stores}`;
}
function aiFormatStats(stats) {
  return ["all", ...STORE_KEYS].map((key) => {
    const label = key === "all" ? "全店" : key;
    const item = stats?.[key] || {};
    const avg = item.avg == null ? "-" : `${Number(item.avg).toFixed(1)}ヶ月`;
    const median = item.median == null ? "-" : `${Number(item.median).toFixed(1)}ヶ月`;
    return `- ${label}: 対象 ${num(item.count || 0)}件 / 平均 ${avg} / 中央値 ${median}`;
  }).join("\n");
}
function aiFormatBreakdownRows(rows, total, key = "all") {
  return (rows || []).map((row) => aiCountLine(row.label || row.reason || "不明", Number(row[key] || row.count || 0), total)).join("\n") || "- データなし";
}
function buildAiCancellationSummary(rows) {
  const sourceRows = Array.isArray(rows) ? rows : [];
  const singleRows = cancellationRowsAsSingleMonth(sourceRows);
  const counts = countCancellations(singleRows, 2000, 1);
  const tenure = cancellationTenureAnalysis(singleRows, 2000, 1);
  const attributes = cancellationAttributeBreakdown(singleRows, 2000, 1);
  const monthly = monthlyCancellationRows(sourceRows).slice(0, 12);
  return [
    `対象退会データ: 全店 ${num(counts.all || 0)}件`,
    "店舗別件数:",
    STORE_KEYS.map((store) => aiCountLine(store, counts[store] || 0, counts.all || 0)).join("\n") || "- データなし",
    "在籍期間分布:",
    aiFormatBreakdownRows(tenure.bands, counts.all || 0),
    "在籍月数の平均・中央値:",
    aiFormatStats(tenure.stats),
    "年齢層別構成:",
    aiFormatBreakdownRows(attributes.ageRows, counts.all || 0),
    "性別構成:",
    aiFormatBreakdownRows(attributes.genderRows, counts.all || 0),
    "月別退会数（直近または対象範囲内の最大12行）:",
    monthly.length ? monthly.map(aiMonthLine).join("\n") : "- データなし",
  ].join("\n");
}
function buildAiSurveySummary(rows) {
  const sourceRows = Array.isArray(rows) ? rows : [];
  const total = sourceRows.length;
  const environment = cancellationSurveyReasonRanking(sourceRows, CANCELLATION_SURVEY_ENVIRONMENT_REASONS, "environmentReasons").filter((row) => row.count > 0).slice(0, 8);
  const service = cancellationSurveyReasonRanking(sourceRows, CANCELLATION_SURVEY_SERVICE_REASONS, "serviceReasons").filter((row) => row.count > 0).slice(0, 8);
  const storeLines = STORE_KEYS.map((store) => {
    const storeRows = sourceRows.filter((row) => row.store === store);
    const top = cancellationSurveyTopReasons(storeRows, 3).join(" / ") || "主因データなし";
    return `- ${store}: ${num(storeRows.length)}件 (${aiPct(storeRows.length, total)}) / 上位理由: ${top}`;
  });
  const ageLines = CANCELLATION_SURVEY_AGE_ROWS.map((label) => {
    const ageRows = sourceRows.filter((row) => cancellationSurveyAgeBand(row.age) === label);
    const top = cancellationSurveyTopReasons(ageRows, 2).join(" / ") || "主因データなし";
    return `- ${label}: ${num(ageRows.length)}件 (${aiPct(ageRows.length, total)}) / 上位理由: ${top}`;
  });
  return [
    `退会アンケート回答: ${num(total)}件`,
    "環境要因ランキング:",
    environment.length ? environment.map((row) => aiCountLine(row.reason, row.count, total)).join("\n") : "- データなし",
    "サービス・継続要因ランキング:",
    service.length ? service.map((row) => aiCountLine(row.reason, row.count, total)).join("\n") : "- データなし",
    "店舗別傾向:",
    storeLines.join("\n"),
    "年齢層別傾向:",
    ageLines.join("\n"),
    "注記: 自由記述・詳細記述の原文、および個人を識別できる列は含めていません。",
  ].join("\n");
}
function counselingRowsValue(value, normalizer) {
  if (value && typeof value === "object" && !Array.isArray(value) && Array.isArray(value.rows)) return value.rows;
  return normalizer(value);
}
function buildAiCounselingSummary(data) {
  const reservations = normalizeCounselingReservations(data?.counselingReservations);
  const activeRows = counselingRowsValue(data?.counselingActiveMembers, normalizeCounselingActiveMembers);
  const newRows = counselingRowsValue(data?.counselingNewMembers, normalizeCounselingNewMembers);
  const cancelRows = counselingRowsValue(data?.counselingCancelMembers, normalizeCounselingCancelMembers);
  if (!reservations.length && !activeRows.length && !newRows.length && !cancelRows.length) {
    return "カウンセリング分析: 未集計 / データ不足";
  }
  const stageCounts = counselingReservationStageCounts(reservations);
  return [
    `カウンセリング予約集計: ${num(reservations.length)}件`,
    `- 初回: ${num(stageCounts[1] || 0)}件 / 2回目: ${num(stageCounts[2] || 0)}件 / 3回目: ${num(stageCounts[3] || 0)}件 / 4回目以降: ${num(stageCounts[4] || 0)}件`,
    `対象会員集計: 既存 ${num(activeRows.length)}件 / 新規 ${num(newRows.length)}件 / 退会予定 ${num(cancelRows.length)}件`,
    "注記: 個別会員名・会員ID・担当者別の個票は含めていません。詳細傾向は未集計の場合があります。",
  ].join("\n");
}
function buildAiSettingsBlock(settings) {
  const s = normalizeAiAssistantSettings(settings);
  const storeLines = STORE_KEYS.map((store) => {
    const item = s.stores[store] || {};
    const details = AI_ASSISTANT_STORE_FIELDS
      .map(([key, label]) => `${label}: ${item[key] || "未設定"}`)
      .join(" / ");
    return `- ${store}: ${details}`;
  });
  const resourceLines = AI_ASSISTANT_RESOURCE_FIELDS.map(([key, label]) => `- ${label}: ${s.monthlyResource[key] || "未設定"}`);
  return ["店舗前提:", ...storeLines, "今月のリソース・制約:", ...resourceLines].join("\n");
}
function buildAiAssistantPrompt({ mode, data, settings, activeNgIds, externalReport, context }) {
  const normalized = normalizeAiAssistantSettings(settings);
  const survey = normalizeCancellationSurvey(data?.cancellationSurvey);
  const cancellationRows = Array.isArray(context?.cancellationRows) ? context.cancellationRows : cancellationRowsOf(data);
  const surveyRows = Array.isArray(context?.surveyRows) ? context.surveyRows : survey.rows;
  const modeKey = mode === "B" ? "B" : "A";
  const ngLines = AI_NG_CONDITIONS
    .filter((item) => activeNgIds.includes(item.id))
    .map((item) => `- ${item.label}`)
    .join("\n") || "- 一時的に指定なし";
  const modeRequest = modeKey === "B"
    ? "外部レポートの主張を、下記の安全な集計データと店舗制約に照らして検証してください。妥当な点、根拠不足、修正すべき施策、追加で必要なデータを分けて出してください。"
    : "下記の安全な集計データと店舗制約だけを使い、退会抑止の施策候補を優先順位付きで提案してください。";
  const outputTemplate = normalized.templates[modeKey] || AI_ASSISTANT_MODE_TEMPLATES[modeKey];
  return [
    outputTemplate,
    "",
    "## 依頼",
    modeRequest,
    "",
    "## 厳守事項",
    "- 数値根拠が弱い断定をしないでください。",
    "- 対象者、必要工数、人員、KPI、期限を具体化してください。",
    "- 店舗差を必ず確認してください。",
    "- 個人名、会員ID、メール、電話番号、自由記述原文、詳細記述原文を含めないでください。",
    "- 不明な点は推測せず「データ不足」と明記してください。",
    "",
    "## 今回有効にするNG条件",
    ngLines,
    "",
    "## 設定・運用前提",
    buildAiSettingsBlock(normalized),
    "",
    "## 使用データの範囲",
    `退会分析: ${context?.cancellationLabel || "保存済み退会データ全体"}`,
    `退会理由分析: ${context?.surveyLabel || "保存済み退会アンケート全体"}`,
    "",
    "## 安全な集計データ（個人情報・自由記述原文なし）",
    "### 退会分析",
    buildAiCancellationSummary(cancellationRows),
    "",
    "### 退会理由分析",
    buildAiSurveySummary(surveyRows),
    "",
    "### カウンセリング分析",
    buildAiCounselingSummary(data),
    ...(modeKey === "B" ? [
      "",
      "## 検証対象の外部レポート",
      externalReport?.trim() || "未入力",
    ] : []),
    "",
    "## 出力形式",
    "- 重要な示唆",
    "- 施策案（対象、工数、担当条件、KPI、期限、リスク）",
    "- 店舗別に変えるべき点",
    "- 根拠不足または追加確認が必要な点",
  ].join("\n");
}
function collectAiKnownNames(data) {
  const tokens = new Set();
  const add = (value) => {
    const text = String(value || "").trim();
    if (text.length >= 2 && text.length <= 30) tokens.add(text);
  };
  for (const row of cancellationRowsOf(data).slice(0, 500)) add(row.name);
  for (const row of normalizeCancellationSurvey(data?.cancellationSurvey).rows.slice(0, 500)) add(row.memberName);
  return [...tokens];
}
function detectAiPromptPii(prompt, data) {
  const text = String(prompt || "");
  const warnings = [];
  if (/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(text)) warnings.push("メールアドレスらしき文字列");
  if (/(?:\+81[-\s]?)?0\d{1,4}[-\s]?\d{1,4}[-\s]?\d{3,4}/.test(text)) warnings.push("電話番号らしき文字列");
  if (/(メンバーID|会員ID|memberId)\s*[:：=]?\s*\d+/i.test(text)) warnings.push("会員IDらしき記載");
  if (/(氏名|名前|memberName)\s*[:：=]/i.test(text)) warnings.push("氏名欄らしき記載");
  if (/(freeText|detailText|自由記述\s*[:：=]|詳細記述\s*[:：=]|原文\s*[:：=])/i.test(text)) warnings.push("自由記述原文らしき記載");
  const knownName = collectAiKnownNames(data).find((name) => text.includes(name));
  if (knownName) warnings.push("保存データ内の氏名と一致する文字列");
  return [...new Set(warnings)];
}

// ============================================================
// デザイントークン / グローバルCSS
// ============================================================
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Noto+Sans+JP:wght@400;500;600;700;800&display=swap');

.f4h-root {
  --bg: #EEF1EC;
  --surface: #FFFFFF;
  --surface-soft: #F5F7F3;
  --ink: #1C1F1B;
  --ink-soft: #5B6058;
  --ink-faint: #8A8F86;
  --border: #DEE3DA;
  --border-soft: #E9ECE5;
  --plum: #7A5285;
  --plum-soft: #F1ECF2;
  --indigo: #34526B;
  --indigo-soft: #EAEFF2;
  --go: #2F6F4E;
  --go-soft: #E5F1EA;
  --amber: #B9791F;
  --amber-soft: #FBF1DF;
  --red: #B8402A;
  --red-soft: #F8E9E5;
  --blue: #3B6E91;
  --blue-soft: #E8F0F4;
  --neutral-soft: #EEF0EB;
  --shadow-sm: 0 1px 2px rgba(28,31,27,0.06), 0 1px 1px rgba(28,31,27,0.04);
  --shadow-md: 0 4px 16px rgba(28,31,27,0.08), 0 1px 2px rgba(28,31,27,0.06);
  --shadow-lg: 0 12px 32px rgba(28,31,27,0.14), 0 2px 8px rgba(28,31,27,0.08);
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 18px;
  --font-display: 'Space Grotesk', 'Noto Sans JP', sans-serif;
  --font-body: 'Noto Sans JP', 'Hiragino Sans', 'Yu Gothic', sans-serif;

  background: var(--bg);
  color: var(--ink);
  font-family: var(--font-body);
  min-height: 100%;
  position: relative;
}
.f4h-root * { box-sizing: border-box; }
.f4h-root .num { font-family: var(--font-display); font-variant-numeric: tabular-nums; font-feature-settings: "tnum"; }
.f4h-root ::selection { background: var(--plum); color: white; }
.f4h-root .scrollbar-thin::-webkit-scrollbar { height: 6px; width: 6px; }
.f4h-root .scrollbar-thin::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }
.f4h-root button { font-family: inherit; cursor: pointer; }
.f4h-root input, .f4h-root select, .f4h-root textarea { font-family: inherit; }
.f4h-root a { color: inherit; }

.f4h-card {
  background: var(--surface);
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
}
.f4h-focus:focus-visible {
  outline: 2px solid var(--indigo);
  outline-offset: 2px;
}
.f4h-btn {
  display: inline-flex; align-items: center; gap: 6px;
  border-radius: var(--radius-sm);
  font-weight: 600; font-size: 13px;
  transition: transform .12s ease, box-shadow .12s ease, background .12s ease;
  border: 1px solid transparent;
  white-space: nowrap;
}
.f4h-btn:active { transform: translateY(1px); }
.f4h-btn-primary { background: var(--ink); color: white; }
.f4h-btn-primary:hover { background: #34372F; }
.f4h-btn-outline { background: var(--surface); color: var(--ink); border-color: var(--border); }
.f4h-btn-outline:hover { background: var(--surface-soft); }
.f4h-btn-danger { background: var(--red-soft); color: var(--red); }
.f4h-btn-danger:hover { background: #f3d9d2; }
.f4h-btn-ghost { background: transparent; color: var(--ink-soft); }
.f4h-btn-ghost:hover { background: var(--surface-soft); color: var(--ink); }

.f4h-tone-go { color: var(--go); background: var(--go-soft); }
.f4h-tone-amber { color: var(--amber); background: var(--amber-soft); }
.f4h-tone-red { color: var(--red); background: var(--red-soft); }
.f4h-tone-blue { color: var(--blue); background: var(--blue-soft); }
.f4h-tone-neutral { color: var(--ink-soft); background: var(--neutral-soft); }

.f4h-ring-track { stroke: #E2E6DC; }
.f4h-fade-in { animation: f4hFadeIn .35s ease both; }
@keyframes f4hFadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }

@media (prefers-reduced-motion: reduce) {
  .f4h-root * { animation-duration: 0.001ms !important; transition-duration: 0.001ms !important; }
}

.f4h-table { width: max-content; min-width: 100%; border-collapse: separate; border-spacing: 0; font-size: 13px; }
.f4h-table th { text-align: right; font-weight: 600; color: var(--ink-soft); font-size: 11px; letter-spacing: .02em;
  padding: 8px 10px; border-bottom: 1px solid var(--border); white-space: nowrap; background: var(--surface-soft); }
.f4h-table th:first-child, .f4h-table td:first-child { text-align: left; }
.f4h-table td { text-align: right; padding: 7px 10px; border-bottom: 1px solid var(--border-soft); white-space: nowrap; }
.f4h-table tr:hover td { background: var(--surface-soft); }

input[type="text"].f4h-input, input[type="number"].f4h-input, input[type="date"].f4h-input, select.f4h-input {
  border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 7px 10px; font-size: 13px;
  background: var(--surface); color: var(--ink); width: 100%;
}
input.f4h-input:focus, select.f4h-input:focus { outline: 2px solid var(--indigo); outline-offset: 1px; border-color: var(--indigo); }

.f4h-navlink { display: flex; align-items: center; gap: 10px; padding: 9px 12px; border-radius: var(--radius-sm);
  color: var(--ink-soft); font-size: 13px; font-weight: 600; transition: background .12s, color .12s; }
.f4h-navlink:hover { background: var(--surface-soft); color: var(--ink); }
.f4h-navlink.active { background: var(--ink); color: white; }

.f4h-nav-desktop { display: flex; }
.f4h-nav-mobile-overlay { display: none; }
.f4h-nav-bottom { display: none; }
.f4h-mobile-menu-btn { display: none; }
@media (max-width: 860px) {
  .f4h-nav-desktop { display: none; }
  .f4h-nav-bottom { display: block !important; }
  .f4h-mobile-menu-btn { display: inline-flex !important; }
  .f4h-main-pad { padding-bottom: 78px !important; }
}
.f4h-kpi-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
.f4h-two-col { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 16px; }
@media (max-width: 1100px) { .f4h-kpi-grid { grid-template-columns: repeat(2, 1fr); } .f4h-two-col { grid-template-columns: 1fr; } }
@media (max-width: 520px) { .f4h-kpi-grid { grid-template-columns: 1fr 1fr; } }
`;

// ============================================================
// 小コンポーネント
// ============================================================
function StatusBadge({ status, size = "md" }) {
  if (!status) return <span className="f4h-tone-neutral" style={{ borderRadius: 999, padding: size === "sm" ? "2px 8px" : "3px 10px", fontSize: size === "sm" ? 11 : 12, fontWeight: 700 }}>—</span>;
  const meta = JUDGE_META[status] || { label: status, tone: "neutral" };
  return (
    <span className={`f4h-tone-${meta.tone}`} style={{ borderRadius: 999, padding: size === "sm" ? "2px 8px" : "3px 10px", fontSize: size === "sm" ? 11 : 12, fontWeight: 700, display: "inline-block" }}>
      {meta.label}
    </span>
  );
}

function DeltaTag({ value, suffix = "", invert = false, fmt }) {
  if (value == null || isNaN(value)) return <span style={{ color: "var(--ink-faint)" }}>—</span>;
  const good = invert ? value <= 0 : value >= 0;
  const Icon = value === 0 ? Minus : (value > 0 ? ArrowUpRight : ArrowDownRight);
  const display = fmt
    ? (value > 0 ? "+" : "") + fmt(value).replace(/^-/, "-")
    : (value > 0 ? "+" : "") + Math.round(value).toLocaleString("ja-JP") + suffix;
  return (
    <span className="num" style={{ display: "inline-flex", alignItems: "center", gap: 2, color: good ? "var(--go)" : "var(--red)", fontWeight: 600, fontSize: 12 }}>
      <Icon size={13} />{display}
    </span>
  );
}

function PacingRing({ size = 132, achievement, expected, status, centerLabel, centerSub }) {
  const stroke = 11;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const a = achievement == null ? 0 : Math.max(0, Math.min(achievement, 1.18));
  const tone = JUDGE_META[status]?.tone || "neutral";
  const color = { go: "var(--go)", amber: "var(--amber)", red: "var(--red)", blue: "var(--blue)", neutral: "var(--ink-faint)" }[tone];
  const arcLen = Math.min(a, 1) * c;
  const expLen = expected == null ? null : Math.max(0, Math.min(expected, 1)) * c;
  const overshoot = a > 1 ? (a - 1) * c : 0;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label="月間ペース">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#E2E6DC" strokeWidth={stroke} />
      {expLen != null && (
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#C7CDBE" strokeWidth={2}
          strokeDasharray={`${expLen} ${c}`} transform={`rotate(-90 ${size / 2} ${size / 2})`} strokeLinecap="butt" opacity={0.9} />
      )}
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={`${arcLen} ${c}`} strokeLinecap="round" transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: "stroke-dasharray .6s ease" }} />
      {overshoot > 0 && (
        <circle cx={size / 2} cy={size / 2} r={r - stroke - 3} fill="none" stroke={color} strokeWidth={3}
          strokeDasharray={`${overshoot * 0.55} ${c}`} strokeLinecap="round" transform={`rotate(-90 ${size / 2} ${size / 2})`} opacity={0.55} />
      )}
      <text x="50%" y="46%" textAnchor="middle" className="num" fontSize={size * 0.19} fontWeight="700" fill="var(--ink)">
        {achievement == null ? "—" : Math.round(achievement * 100) + "%"}
      </text>
      <text x="50%" y="62%" textAnchor="middle" fontSize={size * 0.075} fill="var(--ink-soft)" fontWeight="600">{centerLabel}</text>
      {centerSub && <text x="50%" y="74%" textAnchor="middle" fontSize={size * 0.062} fill="var(--ink-faint)">{centerSub}</text>}
    </svg>
  );
}

function KpiCard({ icon: Icon, label, target, actual, unit, status, fmt = num, deltaInvert = false, sub }) {
  const delta = target != null && actual != null ? actual - target : null;
  return (
    <div className="f4h-card f4h-fade-in" style={{ padding: 14, display: "flex", flexDirection: "column", gap: 8, minWidth: 0 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--ink-soft)", fontSize: 12, fontWeight: 700 }}>
          <Icon size={14} />{label}
        </div>
        <StatusBadge status={status} size="sm" />
      </div>
      <div className="num" style={{ fontSize: 24, fontWeight: 700, lineHeight: 1.1 }}>
        {actual == null ? "—" : fmt(actual)}
        <span style={{ fontSize: 12, color: "var(--ink-faint)", fontWeight: 600, marginLeft: 4 }}>{unit}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 12, color: "var(--ink-faint)" }}>
        <span>目標 {target == null ? "—" : fmt(target)}{unit}</span>
        <DeltaTag value={delta} invert={deltaInvert} />
      </div>
      {sub && <div style={{ fontSize: 11, color: "var(--ink-faint)" }}>{sub}</div>}
    </div>
  );
}

function SectionHeading({ eyebrow, title, action }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 14, flexWrap: "wrap", gap: 10 }}>
      <div>
        {eyebrow && <div style={{ fontSize: 11, fontWeight: 700, color: "var(--ink-faint)", letterSpacing: ".04em", marginBottom: 2 }}>{eyebrow}</div>}
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, margin: 0 }}>{title}</h2>
      </div>
      {action}
    </div>
  );
}

function Pill({ active, onClick, children }) {
  return (
    <button onClick={onClick} className="f4h-focus"
      style={{ padding: "6px 13px", borderRadius: 999, fontSize: 12.5, fontWeight: 700, border: "1px solid " + (active ? "var(--ink)" : "var(--border)"),
        background: active ? "var(--ink)" : "var(--surface)", color: active ? "white" : "var(--ink-soft)", transition: "all .12s" }}>
      {children}
    </button>
  );
}

function ConfirmDialog({ open, title, message, confirmLabel = "削除する", danger = true, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(28,31,27,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 16 }}
      onClick={onCancel}>
      <div className="f4h-card f4h-fade-in" style={{ padding: 22, maxWidth: 360, width: "100%", boxShadow: "var(--shadow-lg)" }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
          <AlertTriangle size={20} color="var(--red)" style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{title}</div>
            <div style={{ fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.5 }}>{message}</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 18 }}>
          <button className="f4h-btn f4h-btn-outline f4h-focus" style={{ padding: "8px 14px" }} onClick={onCancel}>キャンセル</button>
          <button className={`f4h-btn ${danger ? "f4h-btn-danger" : "f4h-btn-primary"} f4h-focus`} style={{ padding: "8px 14px" }} onClick={onConfirm}>{confirmLabel}</button>
        </div>
      </div>
    </div>
  );
}

function Toast({ toast }) {
  if (!toast) return null;
  return (
    <div style={{ position: "fixed", bottom: 20, left: "50%", transform: "translateX(-50%)", zIndex: 200 }} className="f4h-fade-in">
      <div className="f4h-card" style={{ padding: "10px 18px", display: "flex", alignItems: "center", gap: 8, boxShadow: "var(--shadow-lg)",
        background: toast.error ? "var(--red-soft)" : "var(--ink)", color: toast.error ? "var(--red)" : "white", border: "none" }}>
        {toast.error ? <AlertCircle size={16} /> : <CheckCircle2 size={16} />}
        <span style={{ fontSize: 13, fontWeight: 600 }}>{toast.msg}</span>
      </div>
    </div>
  );
}

function EmptyState({ icon: Icon = Info, title, sub, action }) {
  return (
    <div style={{ textAlign: "center", padding: "44px 20px", color: "var(--ink-faint)" }}>
      <Icon size={28} style={{ marginBottom: 10, opacity: 0.6 }} />
      <div style={{ fontWeight: 700, color: "var(--ink-soft)", fontSize: 14 }}>{title}</div>
      {sub && <div style={{ fontSize: 12.5, marginTop: 4, maxWidth: 360, marginInline: "auto" }}>{sub}</div>}
      {action && <div style={{ marginTop: 14 }}>{action}</div>}
    </div>
  );
}

function MonthPicker({ year, month, onChange, minYear = 2024 }) {
  const go = (dy, dm) => {
    let y = year, m = month + dm + dy * 12;
    while (m < 1) { m += 12; y -= 1; }
    while (m > 12) { m -= 12; y += 1; }
    if (y < minYear) return;
    onChange(y, m);
  };
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 999, padding: 4 }}>
      <button className="f4h-btn f4h-btn-ghost f4h-focus" style={{ padding: 6, borderRadius: 999 }} onClick={() => go(-1, 0)} aria-label="前年"><ChevronLeft size={14} /></button>
      <button className="f4h-btn f4h-btn-ghost f4h-focus" style={{ padding: "4px 6px", borderRadius: 999 }} onClick={() => go(0, -1)} aria-label="前月"><ChevronLeft size={16} /></button>
      <div className="num" style={{ fontWeight: 700, fontSize: 13.5, minWidth: 84, textAlign: "center" }}>{year}年{month}月</div>
      <button className="f4h-btn f4h-btn-ghost f4h-focus" style={{ padding: "4px 6px", borderRadius: 999 }} onClick={() => go(0, 1)} aria-label="翌月"><ChevronRight size={16} /></button>
      <button className="f4h-btn f4h-btn-ghost f4h-focus" style={{ padding: 6, borderRadius: 999 }} onClick={() => go(1, 0)} aria-label="翌年"><ChevronRight size={14} /></button>
    </div>
  );
}

function SubTabs({ tabs, active, onChange }) {
  return (
    <div className="scrollbar-thin" style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 2 }}>
      {tabs.map((t) => <Pill key={t.key} active={active === t.key} onClick={() => onChange(t.key)}>{t.label}</Pill>)}
    </div>
  );
}

const NAV_SECTIONS = [
  {
    label: "KPI管理",
    items: [
      { key: "dashboard", label: "ダッシュボード", icon: LayoutDashboard },
      { key: "monthlyReport", label: "月次レポート", icon: FileText },
      { key: "compare", label: "予実・前年比", icon: TrendingUp },
    ],
  },
  {
    label: "分析",
    items: [
      { key: "cvr", label: "CVR分析", icon: BarChart3 },
      { key: "cancellation", label: "退会分析", icon: UserMinus },
      { key: "counseling", label: "カウンセリング分析", icon: UserCog },
      { key: "marketing", label: "マーケティング分析", icon: Target },
    ],
  },
  {
    label: "データ管理",
    items: [
      { key: "entry", label: "データ入力", icon: Upload },
    ],
  },
  {
    label: "設定",
    items: [
      { key: "settings", label: "設定", icon: SettingsIcon },
    ],
  },
];
const NAV_ITEMS = NAV_SECTIONS.flatMap((section) => section.items);

function NavSections({ active, onChange }) {
  return (
    <>
      {NAV_SECTIONS.map((section) => (
        <div key={section.label} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <div style={{
            padding: "10px 12px 4px", fontSize: 10.5, fontWeight: 800, color: "var(--ink-faint)",
            letterSpacing: ".06em",
          }}>
            {section.label}
          </div>
          {section.items.map((item) => (
            <button key={item.key} onClick={() => onChange(item.key)} className={`f4h-navlink f4h-focus ${active === item.key ? "active" : ""}`}>
              <item.icon size={16} /> {item.label}
            </button>
          ))}
        </div>
      ))}
    </>
  );
}

function NavRail({ active, onChange, mobileOpen, setMobileOpen }) {
  return (
    <>
      <aside className="f4h-nav-desktop" style={{
        width: 208, flexShrink: 0, borderRight: "1px solid var(--border-soft)", padding: "20px 12px",
        display: "flex", flexDirection: "column", gap: 18, position: "sticky", top: 0, height: "100vh",
      }}>
        <div style={{ padding: "0 8px", display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: "var(--ink)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 13 }}>4H</div>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14.5, lineHeight: 1.15 }}>4H fitness<br /><span style={{ fontWeight: 500, fontSize: 11, color: "var(--ink-faint)" }}>総合ダッシュボード</span></div>
        </div>
        <nav style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <NavSections active={active} onChange={onChange} />
        </nav>
        <div style={{ marginTop: "auto", padding: "10px 8px", fontSize: 10.5, color: "var(--ink-faint)", lineHeight: 1.5 }}>
          梅ヶ丘・狛江 共通データ<br />全スタッフで共有されます
        </div>
      </aside>

      {mobileOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 90, background: "rgba(28,31,27,0.45)" }} className="f4h-nav-mobile-overlay" onClick={() => setMobileOpen(false)}>
          <div className="f4h-card f4h-fade-in" style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 240, borderRadius: 0, padding: 18 }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>4H fitness</div>
              <button onClick={() => setMobileOpen(false)} className="f4h-btn f4h-btn-ghost f4h-focus" style={{ padding: 6 }}><X size={18} /></button>
            </div>
            <nav style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <NavSections active={active} onChange={(key) => { onChange(key); setMobileOpen(false); }} />
            </nav>
          </div>
        </div>
      )}

      <div className="f4h-nav-bottom" style={{
        display: "none", position: "fixed", bottom: 0, left: 0, right: 0, background: "var(--surface)",
        borderTop: "1px solid var(--border)", zIndex: 80, padding: "6px 4px calc(6px + env(safe-area-inset-bottom))",
      }}>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          {NAV_ITEMS.map((item) => (
            <button key={item.key} onClick={() => onChange(item.key)} className="f4h-focus" style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: 2, padding: "4px 6px",
              color: active === item.key ? "var(--ink)" : "var(--ink-faint)", fontSize: 9.5, fontWeight: 700, flex: 1,
            }}>
              <item.icon size={18} /> {item.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

// ============================================================
// ダッシュボード画面
// ============================================================
function judgeChurn(actual, target, asOfDate, isCurrentMonth) {
  if (actual == null || target == null) return null;
  if (!isCurrentMonth) return actual <= target ? J.ACHIEVED : J.EXCEEDED;
  if (asOfDate.getDate() < 16) return J.MONITORING;
  return actual <= target ? J.ACHIEVED : J.EXCEEDED;
}

function todayParts() {
  const d = new Date();
  return { year: d.getFullYear(), month: d.getMonth() + 1, date: d };
}

function DashboardView({ data, showToast }) {
  const today = useMemo(() => todayParts(), []);
  const [year, setYear] = useState(today.year);
  const [month, setMonth] = useState(today.month);
  const [store, setStore] = useState(""); // "" = 全店
  const [asOfStr, setAsOfStr] = useState(() => new Date().toISOString().slice(0, 10));
  const [ringMetric, setRingMetric] = useState("trials");

  const asOfDate = useMemo(() => parseDate(asOfStr) || today.date, [asOfStr, today]);
  const isCurrentMonth = ymEqual(year, month, asOfDate.getFullYear(), asOfDate.getMonth() + 1);

  const calc = useMemo(() => {
    const { trials, joins, memberMonthly, baselines, budgetTargets, revenueActuals, settings } = data;
    const storeArg = store || null;
    const budget = getBudgetForStore(budgetTargets, storeArg, year, month, settings.targetCvrPct);
    const mm = getStoreOrAllMemberMonthly(memberMonthly, storeArg, year, month);
    const priorTotal = getPriorMonthTotal(memberMonthly, baselines, storeArg, year, month);
    // 体験数（総予約数）：今後の予約分も含めた全件
    const trialAgg = aggregateTrialPeriod(trials, { store: storeArg, months: [{ year, month }] });
    // CVR算出用：基準日までに実施済みの体験だけに絞る（未実施分で獲得率が不当に下がらないように）
    const trialAggEligible = aggregateTrialPeriod(trials, { store: storeArg, months: [{ year, month }], asOf: asOfDate, joins });
    const pendingCount = trialAgg.trialCount - trialAggEligible.trialCount;
    const revenueActual = getRevenueActual(revenueActuals, storeArg, year, month);
    const churn = churnRateOf(mm?.leaves, priorTotal);
    const net = netIncreaseOf(mm?.joinsTotal, mm?.leaves);

    return {
      revenue: { target: budget?.revenue ?? null, actual: revenueActual,
        judge: judgeRevenue(revenueActual, budget?.revenue ?? null, asOfDate, isCurrentMonth) },
      members: { target: budget?.members ?? null, actual: mm?.total ?? null,
        judge: judgeSimple(mm?.total ?? null, budget?.members ?? null) },
      trials: { target: budget?.trials ?? null, actual: trialAgg.trialCount,
        judge: judgePacing(trialAgg.trialCount, budget?.trials ?? null, asOfDate, isCurrentMonth) },
      joins: { target: budget?.joins ?? null, actual: mm?.joinsTotal ?? null,
        judge: judgePacing(mm?.joinsTotal ?? null, budget?.joins ?? null, asOfDate, isCurrentMonth) },
      cvr: { target: settings.targetCvrPct, actual: trialAggEligible.cvr,
        judge: judgeSimple(trialAggEligible.cvr, settings.targetCvrPct) },
      leaves: { target: budget?.leaves ?? null, actual: mm?.leaves ?? null,
        judge: judgeLowerBetter(mm?.leaves ?? null, budget?.leaves ?? null, asOfDate, isCurrentMonth) },
      churn: { target: settings.churnThresholdPct, actual: churn,
        judge: judgeChurn(churn, settings.churnThresholdPct, asOfDate, isCurrentMonth) },
      net: { target: budget?.netIncrease ?? null, actual: net,
        judge: judgeSimple(net, budget?.netIncrease ?? null) },
      trialJoinCvrCount: trialAggEligible.joinCount,
      pendingCount,
    };
  }, [data, store, year, month, asOfDate, isCurrentMonth]);

  const storeRows = useMemo(() => {
    const keys = [{ key: "", label: "全店総計" }, ...STORE_DEFS.map((s) => ({ key: s.key, label: s.key }))];
    return keys.map(({ key, label }) => {
      const mm = getStoreOrAllMemberMonthly(data.memberMonthly, key || null, year, month);
      const prior = getPriorMonthTotal(data.memberMonthly, data.baselines, key || null, year, month);
      const trialAgg = aggregateTrialPeriod(data.trials, { store: key || null, months: [{ year, month }] });
      const trialAggEligible = aggregateTrialPeriod(data.trials, { store: key || null, months: [{ year, month }], asOf: asOfDate, joins: data.joins });
      const revenueActual = getRevenueActual(data.revenueActuals, key || null, year, month);
      return {
        key, label, color: key ? STORE_COLOR[key] : "var(--ink)",
        revenue: revenueActual, members: mm?.total ?? null, trials: trialAgg.trialCount,
        joins: mm?.joinsTotal ?? null, cvr: trialAggEligible.cvr, leaves: mm?.leaves ?? null,
        churn: churnRateOf(mm?.leaves, prior), net: netIncreaseOf(mm?.joinsTotal, mm?.leaves),
      };
    });
  }, [data, year, month, asOfDate]);

  const trendData = useMemo(() => {
    const months = monthsOfYear(year);
    return months.map((m) => {
      const cur = getStoreOrAllMemberMonthly(data.memberMonthly, store || null, m.year, m.month);
      const prev = getStoreOrAllMemberMonthly(data.memberMonthly, store || null, m.year - 1, m.month);
      return { label: monthLabel(m.month), 今年: cur?.total ?? null, 前年: prev?.total ?? null };
    });
  }, [data, year, store]);

  const ringInfo = {
    trials: { label: "体験数", target: calc.trials.target, actual: calc.trials.actual, judge: calc.trials.judge },
    joins: { label: "入会数", target: calc.joins.target, actual: calc.joins.actual, judge: calc.joins.judge },
    revenue: { label: "売上", target: calc.revenue.target, actual: calc.revenue.actual, judge: calc.revenue.judge },
  }[ringMetric];
  const ringAchievement = ringInfo.target ? ringInfo.actual / ringInfo.target : null;
  const expectedPace = isCurrentMonth ? asOfDate.getDate() / daysInMonth(year, month) : (ringAchievement != null ? 1 : null);

  const storeLabel = store || "全店";
  const dim = daysInMonth(year, month);

  return (
    <div className="f4h-fade-in" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <SectionHeading
        eyebrow={`${year}年${month}月 ・ ${storeLabel}`}
        title="今月の進捗"
        action={
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
            <div style={{ display: "flex", gap: 4 }}>
              <Pill active={store === ""} onClick={() => setStore("")}>全店</Pill>
              {STORE_DEFS.map((s) => <Pill key={s.key} active={store === s.key} onClick={() => setStore(s.key)}>{s.key}</Pill>)}
            </div>
            <MonthPicker year={year} month={month} onChange={(y, m) => { setYear(y); setMonth(m); }} />
          </div>
        }
      />

      <div className="f4h-two-col">
        <div className="f4h-card" style={{ padding: 22, display: "flex", gap: 22, alignItems: "center", flexWrap: "wrap" }}>
          <PacingRing achievement={ringAchievement} expected={expectedPace} status={ringInfo.judge}
            centerLabel={ringInfo.label} centerSub={ringInfo.target ? `目標${ringMetric === "revenue" ? yen(ringInfo.target) : num(ringInfo.target)}` : ""} />
          <div style={{ flex: 1, minWidth: 180 }}>
            <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
              <Pill active={ringMetric === "trials"} onClick={() => setRingMetric("trials")}>体験数</Pill>
              <Pill active={ringMetric === "joins"} onClick={() => setRingMetric("joins")}>入会数</Pill>
              <Pill active={ringMetric === "revenue"} onClick={() => setRingMetric("revenue")}>売上</Pill>
            </div>
            <div style={{ fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.6 }}>
              {isCurrentMonth ? (
                <>本日は{month}月{asOfDate.getDate()}日（{dim}日中）。内側の薄い線が「このペースで進んでいれば届くはずの位置」、太い線が現在の実績です。</>
              ) : (
                <>{year}年{month}月は終了月として表示しています（達成/未達成の最終判定のみ）。</>
              )}
            </div>
            <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 8 }}>
              <Clock size={14} color="var(--ink-faint)" />
              <label style={{ fontSize: 12, color: "var(--ink-faint)" }}>基準日</label>
              <input type="date" className="f4h-input" style={{ width: 150 }} value={asOfStr} onChange={(e) => setAsOfStr(e.target.value)} />
            </div>
          </div>
        </div>

        <div className="f4h-card" style={{ padding: "18px 18px 6px" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink-soft)", marginBottom: 8 }}>会員数推移（{storeLabel}・前年比）</div>
          <ResponsiveContainer width="100%" height={150}>
            <AreaChart data={trendData} margin={{ top: 4, right: 6, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="gradCur" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--indigo)" stopOpacity={0.28} />
                  <stop offset="100%" stopColor="var(--indigo)" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 5" stroke="#E2E6DC" vertical={false} />
              <XAxis dataKey="label" tick={{ fontSize: 10, fill: "var(--ink-faint)" }} axisLine={{ stroke: "#E2E6DC" }} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "var(--ink-faint)" }} axisLine={false} tickLine={false} width={42} domain={["dataMin - 20", "dataMax + 20"]} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid var(--border)" }} />
              <Area type="monotone" dataKey="前年" stroke="#B7BDAE" strokeWidth={1.5} strokeDasharray="4 3" fill="none" dot={false} />
              <Area type="monotone" dataKey="今年" stroke="var(--indigo)" strokeWidth={2.2} fill="url(#gradCur)" dot={{ r: 2 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="f4h-kpi-grid">
        <KpiCard icon={Banknote} label="売上" target={calc.revenue.target} actual={calc.revenue.actual} fmt={yen} status={calc.revenue.judge} />
        <KpiCard icon={Users} label="会員数" target={calc.members.target} actual={calc.members.actual} unit="人" status={calc.members.judge} />
        <KpiCard icon={Target} label="体験数" target={calc.trials.target} actual={calc.trials.actual} unit="件" status={calc.trials.judge}
          sub={calc.pendingCount > 0 ? `うち今後の予約 ${num(calc.pendingCount)}件（CVRには未算入）` : "今月の予約総数（実施前も含む）"} />
        <KpiCard icon={UserPlus} label="入会数" target={calc.joins.target} actual={calc.joins.actual} unit="人" status={calc.joins.judge}
          sub={`うち体験経由で入会判定 ${num(calc.trialJoinCvrCount)}件（CVR算出用）`} />
        <KpiCard icon={Percent} label="獲得率 CVR" target={calc.cvr.target} actual={calc.cvr.actual} fmt={pct1} status={calc.cvr.judge}
          sub="本日までに実施済みの体験のみで算出" />
        <KpiCard icon={UserMinus} label="退会数" target={calc.leaves.target} actual={calc.leaves.actual} unit="人" status={calc.leaves.judge} deltaInvert />
        <KpiCard icon={TrendingDown} label="退会率" target={calc.churn.target} actual={calc.churn.actual} fmt={pct1} status={calc.churn.judge} deltaInvert />
        <KpiCard icon={TrendingUp} label="純増数" target={calc.net.target} actual={calc.net.actual} unit="人" status={calc.net.judge} />
      </div>

      <div className="f4h-card scrollbar-thin" style={{ padding: 18, overflowX: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink-soft)" }}>店舗別サマリー（{year}年{month}月）</div>
          <div style={{ fontSize: 11, color: "var(--ink-faint)" }}>体験数は今後の予約も含む総数／CVRは本日までに実施済みの体験のみで算出</div>
        </div>
        <table className="f4h-table">
          <thead><tr>
            <th>店舗</th><th>売上実績</th><th>会員数</th><th>体験数</th><th>入会数</th><th>CVR</th><th>退会数</th><th>退会率</th><th>純増</th>
          </tr></thead>
          <tbody>
            {storeRows.map((r) => (
              <tr key={r.key || "all"}>
                <td style={{ fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ width: 8, height: 8, borderRadius: 99, background: r.color, display: "inline-block" }} />{r.label}
                </td>
                <td className="num">{yen(r.revenue)}</td>
                <td className="num">{num(r.members)}</td>
                <td className="num">{num(r.trials)}</td>
                <td className="num">{num(r.joins)}</td>
                <td className="num" style={{ fontWeight: 700 }}>{pct1(r.cvr)}</td>
                <td className="num">{num(r.leaves)}</td>
                <td className="num">{pct1(r.churn)}</td>
                <td className="num"><DeltaTag value={r.net} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MonthlyReportDiff({ label, value, formatter, invert = false }) {
  const valid = value != null && !isNaN(value);
  const good = valid ? (invert ? value <= 0 : value >= 0) : null;
  return (
    <div style={{
      marginTop: 3,
      fontSize: 11,
      fontWeight: 700,
      color: !valid ? "var(--ink-faint)" : good ? "var(--go)" : "var(--red)",
      whiteSpace: "nowrap",
    }}>
      {label} {valid ? formatter(value) : "—"}
    </div>
  );
}

function reportSignedInt(value, unit = "") {
  if (value == null || isNaN(value)) return "—";
  return `${value > 0 ? "+" : ""}${Math.round(value).toLocaleString("ja-JP")}${unit}`;
}

function reportSignedPt(value) {
  if (value == null || isNaN(value)) return "—";
  const pt = value * 100;
  return `${pt > 0 ? "+" : ""}${pt.toFixed(1)}pt`;
}

function buildMonthlySummary(diffs, isCurrentMonth) {
  const ok = (v) => v != null && !isNaN(v);
  const good = [
    { when: ok(diffs.cvrDiff) && diffs.cvrDiff >= 0, text: "CVRが目標を上回っています" },
    { when: ok(diffs.churnDiff) && diffs.churnDiff <= 0, text: "退会率が目標内に収まっています" },
    { when: ok(diffs.netDiff) && diffs.netDiff >= 0, text: "純増が目標を上回っています" },
    { when: ok(diffs.revenueDiff) && diffs.revenueDiff >= 0, text: "売上が目標を上回っています" },
    { when: ok(diffs.membersDiff) && diffs.membersDiff >= 0, text: "会員数が前年を上回っています" },
  ].find((item) => item.when);
  const issue = [
    { when: ok(diffs.churnDiff) && diffs.churnDiff > 0, cause: "退会率が目標を超えている", action: "継続支援の強化" },
    { when: ok(diffs.trialsDiff) && diffs.trialsDiff < 0, cause: "体験数が目標未達", action: "集客導線の確認" },
    { when: ok(diffs.joinsDiff) && diffs.joinsDiff < 0, cause: "入会数が目標未達", action: "体験からの提案トークの確認" },
    { when: ok(diffs.netDiff) && diffs.netDiff < 0, cause: "純増が目標未達", action: "入会数と退会数の両面の確認" },
    { when: ok(diffs.revenueDiff) && diffs.revenueDiff < 0, cause: "売上が目標未達", action: "会員数・入会数・退会数の確認" },
    { when: ok(diffs.membersDiff) && diffs.membersDiff < 0, cause: "会員数が前年を下回っている", action: "継続的な集客状況の見直し" },
  ].find((item) => item.when);
  const note = isCurrentMonth ? "（月途中のため、売上・体験数は今後変動します）" : "";
  if (!good) return `今月は複数指標が目標未達です。優先課題の確認が必要です。${note}`;
  if (!issue) return `今月は主要指標が概ね良好です。この状態を維持してください。${note}`;
  return `今月は${good.text}。一方で${issue.cause}のため、${issue.action}が必要です。${note}`;
}

function MonthlyReportView({ data }) {
  const today = useMemo(() => todayParts(), []);
  const [year, setYear] = useState(today.year);
  const [month, setMonth] = useState(today.month);
  const asOfNow = today.date;
  const isCurrentMonth = ymEqual(year, month, asOfNow.getFullYear(), asOfNow.getMonth() + 1);

  const columns = useMemo(() => {
    return [
      { key: "all", label: "全店合計", store: null, color: "var(--ink)" },
      ...STORE_DEFS.map((s) => ({ key: s.key, label: s.key, store: s.key, color: s.color })),
    ].map((col) => {
      const mm = getStoreOrAllMemberMonthly(data.memberMonthly, col.store, year, month);
      const prevMm = getStoreOrAllMemberMonthly(data.memberMonthly, col.store, year - 1, month);
      const budget = getBudgetForStore(data.budgetTargets, col.store, year, month, data.settings.targetCvrPct);
      const priorTotal = getPriorMonthTotal(data.memberMonthly, data.baselines, col.store, year, month);
      const trialAgg = aggregateTrialPeriod(data.trials, { store: col.store, months: [{ year, month }] });
      const trialAggEligible = aggregateTrialPeriod(data.trials, { store: col.store, months: [{ year, month }], asOf: asOfNow, joins: data.joins });
      const revenue = getRevenueActual(data.revenueActuals, col.store, year, month);
      const churn = churnRateOf(mm?.leaves, priorTotal);
      const net = netIncreaseOf(mm?.joinsTotal, mm?.leaves);
      return {
        ...col,
        members: mm?.total ?? null,
        revenue,
        trials: trialAgg.trialCount,
        joins: mm?.joinsTotal ?? null,
        cvr: trialAggEligible.cvr,
        leaves: mm?.leaves ?? null,
        churn,
        net,
        membersDiff: mm?.total != null && prevMm?.total != null ? mm.total - prevMm.total : null,
        revenueDiff: revenue != null && budget?.revenue != null ? revenue - budget.revenue : null,
        trialsDiff: budget?.trials != null ? trialAgg.trialCount - budget.trials : null,
        joinsDiff: mm?.joinsTotal != null && budget?.joins != null ? mm.joinsTotal - budget.joins : null,
        cvrDiff: trialAggEligible.cvr != null && data.settings.targetCvrPct != null ? trialAggEligible.cvr - data.settings.targetCvrPct : null,
        leavesDiff: mm?.leaves != null && budget?.leaves != null ? mm.leaves - budget.leaves : null,
        churnDiff: churn != null && data.settings.churnThresholdPct != null ? churn - data.settings.churnThresholdPct : null,
        netDiff: net != null && budget?.netIncrease != null ? net - budget.netIncrease : null,
      };
    });
  }, [data, year, month, asOfNow]);

  const rows = [
    { key: "members", label: "会員数", fmt: num, diffKey: "membersDiff", diffLabel: "前年比", diffFmt: (v) => reportSignedInt(v) },
    { key: "revenue", label: "売上", fmt: yen, diffKey: "revenueDiff", diffLabel: "目標差", diffFmt: (v) => reportSignedInt(v, "円") },
    { key: "trials", label: "体験数", fmt: num, diffKey: "trialsDiff", diffLabel: "目標差", diffFmt: (v) => reportSignedInt(v) },
    { key: "joins", label: "入会数", fmt: num, diffKey: "joinsDiff", diffLabel: "目標差", diffFmt: (v) => reportSignedInt(v) },
    { key: "cvr", label: "CVR", fmt: pct1, diffKey: "cvrDiff", diffLabel: "目標差", diffFmt: reportSignedPt },
    { key: "leaves", label: "退会数", fmt: num, diffKey: "leavesDiff", diffLabel: "目標差", diffFmt: (v) => reportSignedInt(v), invert: true },
    { key: "churn", label: "退会率", fmt: pct1, diffKey: "churnDiff", diffLabel: "目標差", diffFmt: reportSignedPt, invert: true },
    { key: "net", label: "純増", fmt: signed, diffKey: "netDiff", diffLabel: "目標差", diffFmt: (v) => reportSignedInt(v) },
  ];
  const summaryText = useMemo(() => buildMonthlySummary(columns[0] || {}, isCurrentMonth), [columns, isCurrentMonth]);
  const weeklyRows = useMemo(() => {
    const dim = daysInMonth(year, month);
    const joinsMap = buildJoinsMap(data.joins);
    const weeklyColumns = [
      { key: "all", label: "全店合計", store: null, color: "var(--ink)" },
      ...STORE_DEFS.map((s) => ({ key: s.key, label: s.key, store: s.key, color: s.color })),
    ];
    return [
      { label: "1〜7日", dayFrom: 1, dayTo: 7 },
      { label: "8〜14日", dayFrom: 8, dayTo: 14 },
      { label: "15〜21日", dayFrom: 15, dayTo: 21 },
      { label: "22日〜月末", dayFrom: 22, dayTo: dim },
    ].map((week) => {
      const stores = weeklyColumns.map((col) => {
        const eligibleRows = filterTrials(data.trials, { store: col.store, year, month, dayFrom: week.dayFrom, dayTo: week.dayTo, asOf: asOfNow });
        const joinCount = countTrialJoinsRows(eligibleRows, joinsMap);
        return {
          ...col,
          trialCount: eligibleRows.length,
          joinCount,
          cvr: cvrOf(eligibleRows.length, joinCount),
        };
      });
      return {
        ...week,
        stores,
      };
    });
  }, [data.trials, data.joins, year, month, asOfNow]);

  return (
    <div className="f4h-fade-in" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <SectionHeading
        eyebrow={`${year}年${month}月`}
        title="月次レポート"
        action={<MonthPicker year={year} month={month} onChange={(y, m) => { setYear(y); setMonth(m); }} />}
      />

      <div className="f4h-card" style={{ padding: "14px 16px", display: "flex", gap: 10, alignItems: "flex-start", background: "var(--surface-soft)" }}>
        <Info size={17} color="var(--ink-soft)" style={{ flexShrink: 0, marginTop: 1 }} />
        <div style={{ fontSize: 13, lineHeight: 1.7, color: "var(--ink-soft)", fontWeight: 700 }}>
          {summaryText}
        </div>
      </div>

      <div className="f4h-card scrollbar-thin" style={{ padding: 18, overflowX: "auto" }}>
        <table className="f4h-table">
          <thead>
            <tr>
              <th>項目</th>
              {columns.map((col) => (
                <th key={col.key}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    <span style={{ width: 8, height: 8, borderRadius: 99, background: col.color, display: "inline-block" }} />
                    {col.label}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.key}>
                <td style={{ fontWeight: 700 }}>{row.label}</td>
                {columns.map((col) => (
                  <td key={col.key} className="num" style={{ fontWeight: row.key === "cvr" ? 700 : 500 }}>
                    {row.fmt(col[row.key])}
                    <MonthlyReportDiff label={row.diffLabel} value={col[row.diffKey]} formatter={row.diffFmt} invert={row.invert} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="f4h-card scrollbar-thin" style={{ padding: 18, overflowX: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink-soft)" }}>
            週別サマリー（{year}年{month}月）
          </div>
          <div style={{ fontSize: 11, color: "var(--ink-faint)" }}>
            週別サマリーは実施済みの体験日ベースで集計しています。入会数は月次確定値ではなく、体験経由の入会判定です。
          </div>
        </div>
        <table className="f4h-table">
          <thead>
            <tr>
              <th>期間</th>
              <th>全店合計</th>
              {STORE_DEFS.map((store) => <th key={store.key}>{store.key}</th>)}
            </tr>
          </thead>
          <tbody>
            {weeklyRows.map((row) => (
              <tr key={row.label}>
                <td style={{ fontWeight: 700 }}>{row.label}</td>
                {row.stores.map((store) => (
                  <td key={store.key} className="num">
                    <div style={{ display: "grid", gap: 3, justifyItems: "end" }}>
                      <div style={{ fontWeight: 700, color: store.color }}>{num(store.trialCount)}件 / {num(store.joinCount)}人 / {pct1(store.cvr)}</div>
                      <div style={{ fontSize: 11, color: "var(--ink-faint)" }}>体験 / 入会 / CVR</div>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {isCurrentMonth && <div style={{ marginTop: 8, fontSize: 11, color: "var(--ink-faint)" }}>未来の体験予約は体験数・CVRに未算入です</div>}
      </div>
    </div>
  );
}

function CancellationSurveyKpiCard({ label, value, sub }) {
  return (
    <div className="f4h-card" style={{ padding: 14, display: "grid", gap: 7, minWidth: 0 }}>
      <div style={{ fontSize: 11.5, color: "var(--ink-soft)", fontWeight: 800 }}>{label}</div>
      <div className="num" style={{ fontSize: 25, fontWeight: 800, lineHeight: 1.1 }}>{value}</div>
      <div style={{ fontSize: 11, color: "var(--ink-faint)", minHeight: 15 }}>{sub}</div>
    </div>
  );
}
function CancellationSurveyReasonCard({ title, rows, total }) {
  const max = Math.max(1, ...rows.map((row) => row.count));
  return (
    <div className="f4h-card scrollbar-thin" style={{ padding: 16, overflowX: "auto" }}>
      <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 10 }}>{title}</div>
      <table className="f4h-table" style={{ fontSize: 12.5 }}>
        <thead><tr><th>理由名</th><th>件数</th><th>回答者比率</th><th>グラフ</th></tr></thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.reason}>
              <td style={{ textAlign: "left", fontWeight: 700 }}>{row.reason}</td>
              <td className="num">{num(row.count)}件</td>
              <td className="num">{pct1(row.rate)}</td>
              <td style={{ minWidth: 180 }}>
                <div style={{ height: 9, borderRadius: 99, background: "var(--bg-soft)", overflow: "hidden" }}>
                  <div style={{ width: `${Math.round((row.count / max) * 100)}%`, height: "100%", borderRadius: 99, background: "var(--ink)" }} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: 8, fontSize: 11, color: "var(--ink-faint)" }}>
        比率は回答者数{num(total)}人に対する割合です。
      </div>
    </div>
  );
}
function CancellationSurveyStoreComparison({ rows }) {
  const reasons = [
    ...CANCELLATION_SURVEY_ENVIRONMENT_REASONS.slice(0, 8),
    ...CANCELLATION_SURVEY_SERVICE_REASONS.slice(0, 10),
  ];
  const storeRows = STORE_KEYS.map((store) => ({ store, rows: rows.filter((row) => row.store === store) }));
  const comparisonRows = reasons.map((reason) => {
    const rec = { reason };
    for (const { store, rows: storeSurveyRows } of storeRows) {
      const count = storeSurveyRows.filter((row) => [...(row.environmentReasons || []), ...(row.serviceReasons || [])].includes(reason)).length;
      rec[store] = { count, rate: storeSurveyRows.length ? count / storeSurveyRows.length : null };
    }
    rec.total = STORE_KEYS.reduce((sum, store) => sum + (rec[store]?.count || 0), 0);
    return rec;
  }).filter((row) => row.total > 0).sort((a, b) => b.total - a.total).slice(0, 14);
  return (
    <div className="f4h-card scrollbar-thin" style={{ padding: 16, overflowX: "auto" }}>
      <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 10 }}>店舗比較</div>
      {comparisonRows.length === 0 ? (
        <div style={{ fontSize: 12.5, color: "var(--ink-faint)" }}>比較できる回答がありません。</div>
      ) : (
        <table className="f4h-table" style={{ fontSize: 12.5 }}>
          <thead><tr><th>理由名</th>{STORE_KEYS.map((store) => <th key={store}>{store}比率</th>)}</tr></thead>
          <tbody>
            {comparisonRows.map((row) => (
              <tr key={row.reason}>
                <td style={{ textAlign: "left", fontWeight: 700 }}>{row.reason}</td>
                {STORE_KEYS.map((store) => (
                  <td key={store} style={{ minWidth: 150 }}>
                    <div style={{ display: "grid", gap: 4 }}>
                      <div className="num" style={{ fontWeight: 800 }}>{pct1(row[store]?.rate)} <span style={{ color: "var(--ink-faint)", fontWeight: 600 }}>({num(row[store]?.count)}件)</span></div>
                      <div style={{ height: 8, borderRadius: 99, background: "var(--bg-soft)", overflow: "hidden" }}>
                        <div style={{ width: `${Math.round((row[store]?.rate || 0) * 100)}%`, height: "100%", background: STORE_COLOR[store], borderRadius: 99 }} />
                      </div>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
function CancellationSurveyAgeReasonTable({ rows }) {
  const ageRows = CANCELLATION_SURVEY_AGE_ROWS.map((label) => {
    const groupRows = rows.filter((row) => cancellationSurveyAgeBand(row.age) === label);
    const top = cancellationSurveyTopReasons(groupRows, 3);
    return { label, count: groupRows.length, top };
  });
  return (
    <div className="f4h-card scrollbar-thin" style={{ padding: 16, overflowX: "auto" }}>
      <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 10 }}>年齢別退会理由</div>
      <table className="f4h-table" style={{ fontSize: 12.5 }}>
        <thead><tr><th>年齢帯</th><th>回答者数</th><th>1位理由</th><th>2位理由</th><th>3位理由</th></tr></thead>
        <tbody>
          {ageRows.map((row) => (
            <tr key={row.label}>
              <td style={{ fontWeight: 800 }}>{row.label}</td>
              <td className="num">{num(row.count)}人</td>
              <td style={{ textAlign: "left" }}>{row.top[0] || "—"}</td>
              <td style={{ textAlign: "left" }}>{row.top[1] || "—"}</td>
              <td style={{ textAlign: "left" }}>{row.top[2] || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
function CancellationSurveyTextTable({ title, rows, permission = false }) {
  return (
    <div className="f4h-card scrollbar-thin" style={{ padding: 16, overflowX: "auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center", marginBottom: 10, flexWrap: "wrap" }}>
        <div style={{ fontWeight: 800, fontSize: 14 }}>{title}</div>
        <CounselingStatLine label="対象" value={`${num(rows.length)}件`} />
      </div>
      {rows.length === 0 ? (
        <div style={{ fontSize: 12.5, color: "var(--ink-faint)" }}>該当する回答はありません。</div>
      ) : (
        <table className="f4h-table" style={{ fontSize: 12.3 }}>
          <thead>
            <tr>
              <th>登録日時</th><th>店舗</th><th>年齢</th><th>メンバーID</th><th>氏名</th>
              {permission && <th>選択理由</th>}
              <th>自由記述</th><th>詳細記述</th>
            </tr>
          </thead>
          <tbody>
            {rows.slice(0, 120).map((row, index) => (
              <tr key={`${row.memberId || row.memberName}-${row.registeredAt}-${index}`}>
                <td>{row.registeredAt || "—"}</td>
                <td>{row.store || "不明"}</td>
                <td className="num">{row.age || "—"}</td>
                <td>{row.memberId || "—"}</td>
                <td style={{ textAlign: "left" }}>{row.memberName || "—"}</td>
                {permission && <td style={{ textAlign: "left" }}>{[...(row.environmentReasons || []), ...(row.serviceReasons || [])].join(" / ") || "—"}</td>}
                <td style={{ textAlign: "left", maxWidth: 360, whiteSpace: "normal" }}>{row.freeText || "—"}</td>
                <td style={{ textAlign: "left", maxWidth: 420, whiteSpace: "normal" }}>{row.detailText || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {rows.length > 120 && <div style={{ marginTop: 8, fontSize: 11, color: "var(--ink-faint)" }}>先頭120件を表示中（全{num(rows.length)}件）</div>}
    </div>
  );
}
function AiPromptModal({ data, settings, context, showToast, onClose }) {
  const normalized = normalizeAiAssistantSettings(settings);
  const [mode, setMode] = useState("A");
  const [externalReport, setExternalReport] = useState("");
  const [activeNg, setActiveNg] = useState(() => ({ ...normalized.ngConditions }));
  const [prompt, setPrompt] = useState("");
  const [warnings, setWarnings] = useState([]);
  const activeNgIds = AI_NG_CONDITIONS.filter((item) => activeNg[item.id]).map((item) => item.id);
  const generate = () => {
    const nextPrompt = buildAiAssistantPrompt({
      mode,
      data,
      settings: normalized,
      activeNgIds,
      externalReport,
      context,
    });
    setPrompt(nextPrompt);
    setWarnings(detectAiPromptPii(nextPrompt, data));
  };
  const copyPrompt = async () => {
    if (!prompt) return;
    try {
      await navigator.clipboard.writeText(prompt);
      showToast?.(warnings.length ? "PII警告があります。内容を確認したうえでプロンプトをコピーしました。" : "AI施策検証プロンプトをコピーしました。");
    } catch (e) {
      showToast?.("クリップボードへのコピーに失敗しました。", true);
    }
  };
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(28,31,27,.45)", zIndex: 220, display: "grid", placeItems: "center", padding: 18 }}>
      <div className="f4h-card scrollbar-thin" style={{ width: "min(1040px, 100%)", maxHeight: "92vh", overflow: "auto", padding: 0 }}>
        <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--border-soft)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: 16 }}>AI施策検証</div>
            <div style={{ fontSize: 11.5, color: "var(--ink-faint)", marginTop: 3 }}>外部API送信は行わず、個人情報と自由記述原文を除いた集計プロンプトだけを生成します。</div>
          </div>
          <button className="f4h-btn f4h-btn-outline f4h-focus" style={{ padding: 8 }} onClick={onClose} aria-label="閉じる"><X size={16} /></button>
        </div>
        <div style={{ padding: 16, display: "grid", gap: 14 }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button className={`f4h-btn f4h-focus ${mode === "A" ? "f4h-btn-primary" : "f4h-btn-outline"}`} style={{ padding: "8px 13px" }} onClick={() => setMode("A")}>Mode A 自前分析</button>
            <button className={`f4h-btn f4h-focus ${mode === "B" ? "f4h-btn-primary" : "f4h-btn-outline"}`} style={{ padding: "8px 13px" }} onClick={() => setMode("B")}>Mode B 外部レポート検証</button>
          </div>
          {mode === "B" && (
            <label style={{ display: "grid", gap: 6, fontSize: 12, color: "var(--ink-soft)", fontWeight: 800 }}>
              検証対象の外部レポート
              <textarea
                className="f4h-input"
                value={externalReport}
                onChange={(e) => setExternalReport(e.target.value)}
                placeholder="ここに外部レポートを貼り付けます。個人情報が含まれる場合はコピー前に警告します。"
                style={{ minHeight: 130, resize: "vertical", fontSize: 12.5, lineHeight: 1.6 }}
              />
            </label>
          )}
          <div className="f4h-card" style={{ padding: 12, background: "var(--surface-soft)" }}>
            <div style={{ fontWeight: 800, fontSize: 12.5, marginBottom: 8 }}>一時的に有効にするNG条件</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 8 }}>
              {AI_NG_CONDITIONS.map((item) => (
                <label key={item.id} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "var(--ink-soft)", fontWeight: 700 }}>
                  <input type="checkbox" checked={!!activeNg[item.id]} onChange={(e) => setActiveNg((cur) => ({ ...cur, [item.id]: e.target.checked }))} />
                  {item.label}
                </label>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
            <button className="f4h-btn f4h-btn-primary f4h-focus" style={{ padding: "9px 14px" }} onClick={generate}><Target size={14} /> プロンプト生成</button>
            <button className="f4h-btn f4h-btn-outline f4h-focus" style={{ padding: "9px 14px" }} onClick={copyPrompt} disabled={!prompt}><Copy size={14} /> コピー</button>
            <span style={{ fontSize: 11.5, color: "var(--ink-faint)" }}>生成データ範囲: {context?.cancellationLabel || context?.surveyLabel || "保存済みデータ"}</span>
          </div>
          {warnings.length > 0 && (
            <div style={{ border: "1px solid var(--red-soft)", background: "var(--red-soft)", color: "var(--red)", borderRadius: 8, padding: 11, fontSize: 12, lineHeight: 1.6, fontWeight: 700 }}>
              <AlertTriangle size={14} style={{ verticalAlign: "-2px", marginRight: 5 }} />
              PII警告: {warnings.join("、")} が含まれている可能性があります。コピー前に内容を確認してください。
            </div>
          )}
          <textarea
            className="f4h-input"
            value={prompt}
            readOnly
            placeholder="「プロンプト生成」を押すと、ここにAIへ貼り付けるプロンプトが表示されます。"
            style={{ minHeight: 300, resize: "vertical", fontSize: 12, lineHeight: 1.55, fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" }}
          />
        </div>
      </div>
    </div>
  );
}

function AiAssistantButton({ onClick }) {
  return (
    <button className="f4h-btn f4h-btn-outline f4h-focus" style={{ padding: "8px 13px" }} onClick={onClick}>
      <Target size={14} /> AI施策検証
    </button>
  );
}

function CancellationSurveyAnalysisView({ data, showToast, aiContext }) {
  const survey = normalizeCancellationSurvey(data.cancellationSurvey);
  const rows = survey.rows;
  const latestYm = monthlyCancellationSurveyCounts(rows)[0]?.ym || cancellationYm(todayParts().year, todayParts().month);
  const [periodMode, setPeriodMode] = useState("all");
  const [customStartYm, setCustomStartYm] = useState(latestYm);
  const [customEndYm, setCustomEndYm] = useState(latestYm);
  const [storeFilter, setStoreFilter] = useState("all");
  const [ageFilter, setAgeFilter] = useState("all");
  const [aiOpen, setAiOpen] = useState(false);
  useEffect(() => {
    setCustomStartYm((v) => v || latestYm);
    setCustomEndYm((v) => v || latestYm);
  }, [latestYm]);

  const period = useMemo(() => cancellationSurveyPeriodFromMode(periodMode, customStartYm, customEndYm, rows), [periodMode, customStartYm, customEndYm, rows]);
  const periodRows = useMemo(() => cancellationSurveyRowsInPeriod(rows, period), [rows, period]);
  const storeRows = useMemo(() => cancellationSurveyRowsForStore(periodRows, storeFilter), [periodRows, storeFilter]);
  const filteredRows = useMemo(() => cancellationSurveyRowsForAge(storeRows, ageFilter), [storeRows, ageFilter]);
  const environmentRanking = useMemo(() => cancellationSurveyReasonRanking(filteredRows, CANCELLATION_SURVEY_ENVIRONMENT_REASONS, "environmentReasons"), [filteredRows]);
  const serviceRanking = useMemo(() => cancellationSurveyReasonRanking(filteredRows, CANCELLATION_SURVEY_SERVICE_REASONS, "serviceReasons"), [filteredRows]);
  const freeTextRows = filteredRows.filter((row) => row.freeText || row.detailText);
  const periodTabs = [
    { key: "all", label: "全期間" },
    { key: "current", label: "当月" },
    { key: "previous", label: "前月" },
    { key: "recent3", label: "直近3ヶ月" },
    { key: "recent6", label: "直近半年" },
    { key: "custom", label: "期間指定" },
  ];
  const startParts = customStartYm.split("-").map(Number);
  const endParts = customEndYm.split("-").map(Number);
  const storeFilterLabel = storeFilter === "all" ? "全店" : storeFilter;
  const ageFilterLabel = CANCELLATION_SURVEY_AGE_FILTERS.find((item) => item.key === ageFilter)?.label || "全年代";
  const envRespondents = filteredRows.filter((row) => row.environmentReasons?.length).length;
  const serviceRespondents = filteredRows.filter((row) => row.serviceReasons?.length).length;

  if (!rows.length) {
    return (
      <div className="f4h-card">
        <EmptyState
          icon={UserMinus}
          title="退会者アンケートCSVがまだ取り込まれていません。"
          sub="データ入力 > 退会者アンケートCSV からCSVを取り込むと、退会理由を分析できます。"
        />
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div className="f4h-card" style={{ padding: 14, display: "grid", gap: 10 }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
          {periodTabs.map((tab) => (
            <button key={tab.key} className={`f4h-btn f4h-focus ${periodMode === tab.key ? "f4h-btn-primary" : "f4h-btn-outline"}`} style={{ padding: "7px 12px", fontSize: 12.5 }} onClick={() => setPeriodMode(tab.key)}>
              {tab.label}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
          <span style={{ fontSize: 12, color: "var(--ink-faint)", fontWeight: 700 }}>店舗</span>
          {[{ key: "all", label: "全店" }, ...STORE_KEYS.map((store) => ({ key: store, label: store }))].map((tab) => (
            <Pill key={tab.key} active={storeFilter === tab.key} onClick={() => setStoreFilter(tab.key)}>{tab.label}</Pill>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
          <span style={{ fontSize: 12, color: "var(--ink-faint)", fontWeight: 700 }}>年齢</span>
          {CANCELLATION_SURVEY_AGE_FILTERS.map((tab) => (
            <Pill key={tab.key} active={ageFilter === tab.key} onClick={() => setAgeFilter(tab.key)}>{tab.label}</Pill>
          ))}
        </div>
        {periodMode === "custom" && (
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ fontSize: 12, color: "var(--ink-faint)", fontWeight: 700 }}>開始</span>
            <MonthPicker year={startParts[0]} month={startParts[1]} onChange={(y, m) => setCustomStartYm(cancellationYm(y, m))} />
            <span style={{ fontSize: 12, color: "var(--ink-faint)", fontWeight: 700 }}>終了</span>
            <MonthPicker year={endParts[0]} month={endParts[1]} onChange={(y, m) => setCustomEndYm(cancellationYm(y, m))} />
          </div>
        )}
        <div style={{ fontSize: 11.5, color: "var(--ink-faint)", lineHeight: 1.7 }}>
          登録日時ベースで絞り込み中：{period.label}・{storeFilterLabel}・{ageFilterLabel}。複数回答のため、理由別件数の合計は回答者数を上回る場合があります。
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <AiAssistantButton onClick={() => setAiOpen(true)} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 12 }}>
        <CancellationSurveyKpiCard label="回答者数" value={`${num(filteredRows.length)}人`} sub="選択条件内" />
        <CancellationSurveyKpiCard label="環境要因回答数" value={`${num(envRespondents)}人`} sub="1つ以上選択" />
        <CancellationSurveyKpiCard label="サービス要因回答数" value={`${num(serviceRespondents)}人`} sub="1つ以上選択" />
        <CancellationSurveyKpiCard label="自由記述あり" value={`${num(freeTextRows.length)}人`} sub="自由記述または詳細記述" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: 12 }}>
        <CancellationSurveyReasonCard title="退会理由：環境要因" rows={environmentRanking} total={filteredRows.length} />
        <CancellationSurveyReasonCard title="退会理由：サービス・継続要因" rows={serviceRanking} total={filteredRows.length} />
      </div>

      <CancellationSurveyStoreComparison rows={periodRows} />
      <CancellationSurveyAgeReasonTable rows={storeRows} />
      {aiOpen && (
        <AiPromptModal
          data={data}
          settings={data.aiAssistantSettings}
          context={{
            ...(aiContext || {}),
            surveyRows: filteredRows,
            surveyLabel: `退会理由分析フィルター: ${period.label} / ${storeFilterLabel} / ${ageFilterLabel}`,
          }}
          showToast={showToast}
          onClose={() => setAiOpen(false)}
        />
      )}
      <CancellationSurveyTextTable title="自由記述一覧" rows={freeTextRows} />
    </div>
  );
}

function CancellationAnalysisView({ data, showToast }) {
  const [analysisTab, setAnalysisTab] = useState("summary");
  const rows = useMemo(() => cancellationRowsOf(data), [data]);
  const latest = useMemo(() => latestCancellationYearMonth(rows), [rows]);
  const latestYm = cancellationYm(latest.year, latest.month);
  const [periodMode, setPeriodMode] = useState("current");
  const [customStartYm, setCustomStartYm] = useState(latestYm);
  const [customEndYm, setCustomEndYm] = useState(latestYm);
  const [storeFilter, setStoreFilter] = useState("all");
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailMemberIdQuery, setDetailMemberIdQuery] = useState("");
  const [detailNameQuery, setDetailNameQuery] = useState("");
  const [detailStoreFilter, setDetailStoreFilter] = useState("all");
  const [detailBandFilter, setDetailBandFilter] = useState("all");
  const [detailBandChangedOnly, setDetailBandChangedOnly] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);

  useEffect(() => {
    setCustomStartYm((v) => v || latestYm);
    setCustomEndYm((v) => v || latestYm);
  }, [latestYm]);

  const period = useMemo(() => cancellationPeriodFromMode(periodMode, customStartYm, customEndYm, rows), [periodMode, customStartYm, customEndYm, rows]);
  const periodRows = useMemo(() => cancellationRowsInPeriod(rows, period), [rows, period]);
  const selectedRows = useMemo(() => cancellationRowsForStore(periodRows, storeFilter), [periodRows, storeFilter]);
  const singleMonthRows = useMemo(() => cancellationRowsAsSingleMonth(selectedRows), [selectedRows]);
  const monthlyRows = useMemo(() => monthlyCancellationRows(selectedRows), [selectedRows]);
  const selectedCounts = useMemo(() => countCancellations(singleMonthRows, 2000, 1), [singleMonthRows]);
  const weeklyRequestRows = useMemo(() => weeklyCancellationRequestRowsForPeriod(selectedRows, period), [selectedRows, period]);
  const weeklyRequestTotal = weeklyRequestRows.reduce((sum, row) => sum + row.all, 0);
  const tenureAnalysis = useMemo(() => cancellationTenureAnalysis(singleMonthRows, 2000, 1), [singleMonthRows]);
  const tenureValidTotal = tenureAnalysis.stats.all.count;
  const ageTenureAnalysis = useMemo(() => cancellationAgeTenureAnalysis(singleMonthRows, 2000, 1), [singleMonthRows]);
  const attributeBreakdown = useMemo(() => cancellationAttributeBreakdown(singleMonthRows, 2000, 1), [singleMonthRows]);
  const rawConfirmedCounts = useMemo(() => confirmedCancellationCountsForPeriod(data.memberMonthly, period), [data.memberMonthly, period]);
  const confirmedCounts = useMemo(() => storeFilter === "all" ? rawConfirmedCounts : { all: rawConfirmedCounts[storeFilter] }, [rawConfirmedCounts, storeFilter]);
  const importedAt = data.cancellations?.importedAt ? new Date(data.cancellations.importedAt).toLocaleString("ja-JP") : "—";

  const columns = storeFilter === "all"
    ? [
        { key: "all", label: "全店合計" },
        ...STORE_KEYS.map((s) => ({ key: s, label: s, storeKey: s })),
      ]
    : [{ key: "all", label: storeFilter, storeKey: storeFilter }];
  const storeFilterLabel = storeFilter === "all" ? "全店" : storeFilter;
  const tenureMonthText = (value) => {
    if (value == null || isNaN(value)) return "—";
    const rounded = Math.round(value * 10) / 10;
    return `${rounded.toLocaleString("ja-JP", { maximumFractionDigits: 1 })}ヶ月`;
  };
  const renderAttributeCell = (count, total) => {
    const rate = total ? count / total : null;
    return (
      <div style={{ display: "grid", gap: 2, justifyItems: "end", lineHeight: 1.25 }}>
        <div style={{ fontWeight: 800, fontSize: 15 }}>{num(count)}人</div>
        <div style={{ fontSize: 10.5, color: "var(--ink-faint)", fontWeight: 600 }}>{rate == null ? "—" : pct1(rate)}</div>
      </div>
    );
  };
  const noteStyle = { marginTop: 10, fontSize: 11, color: "var(--ink-faint)", lineHeight: 1.6 };
  const sectionTitleStyle = { fontWeight: 700, fontSize: 14, marginBottom: 12 };
  const denseCardStyle = { padding: 16, overflowX: "auto" };
  const diffAll = confirmedCounts.all == null ? null : selectedCounts.all - confirmedCounts.all;
  const storeDot = (col) => !col.storeKey ? null : (
    <span style={{ width: 7, height: 7, borderRadius: 99, background: STORE_COLOR[col.storeKey] || "var(--ink-faint)", display: "inline-block" }} />
  );
  const storeHead = (col) => (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontWeight: col.key === "all" ? 800 : 700 }}>
      {storeDot(col)}{col.label}
    </span>
  );
  const metricCell = (count, sub) => (
    <div style={{ display: "grid", gap: 2, justifyItems: "end", lineHeight: 1.25 }}>
      <div style={{ fontWeight: 800, fontSize: 15 }}>{num(count)}人</div>
      <div style={{ fontSize: 10.5, color: "var(--ink-faint)", fontWeight: 600 }}>{sub}</div>
    </div>
  );
  const ratioCell = (count, total) => {
    const rate = total ? count / total : null;
    return (
      <div style={{ display: "grid", gap: 2, justifyItems: "end", lineHeight: 1.25 }}>
        <div style={{ fontWeight: 800, fontSize: 15 }}>{num(count)}人</div>
        <div style={{ fontSize: 10.5, color: "var(--ink-faint)", fontWeight: 600 }}>{rate == null ? "—" : pct1(rate)}</div>
      </div>
    );
  };
  const donutColors = ["#7A5285", "#3A5A78", "#5D8A72", "#C08A4B", "#7B8794", "#B85C72", "#8C6A9E", "#4D7C8A"];
  const donutPanelStyle = {
    border: "1px solid var(--border-soft)",
    borderRadius: 8,
    padding: 12,
    minWidth: 0,
    background: "rgba(255,255,255,.45)",
  };
  const buildDonutItems = (sourceRows, key) => sourceRows.map((row, idx) => ({
    label: row.label,
    value: Number(row[key] || 0),
    color: donutColors[idx % donutColors.length],
  })).filter((item) => item.value > 0);
  const DonutCard = ({ title, rows: chartRows, denominator }) => {
    const total = chartRows.reduce((sum, item) => sum + item.value, 0);
    return (
      <div style={donutPanelStyle}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "baseline", marginBottom: 8 }}>
          <div style={{ fontWeight: 800, fontSize: 12.5, color: "var(--ink-soft)" }}>{title}</div>
          <div className="num" style={{ fontSize: 12, color: "var(--ink-faint)", fontWeight: 800 }}>{num(total)}人</div>
        </div>
        {total > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "minmax(130px, 170px) minmax(150px, 1fr)", gap: 12, alignItems: "center" }}>
            <div style={{ width: "100%", height: 152 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={chartRows} dataKey="value" nameKey="label" innerRadius="58%" outerRadius="88%" paddingAngle={2} stroke="var(--bg)" strokeWidth={2}>
                    {chartRows.map((entry) => <Cell key={entry.label} fill={entry.color} />)}
                  </Pie>
                  <Tooltip formatter={(value, name) => [`${num(value)}人`, name]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div style={{ display: "grid", gap: 6 }}>
              {chartRows.map((item) => (
                <div key={item.label} style={{ display: "grid", gridTemplateColumns: "10px minmax(0, 1fr) auto", gap: 7, alignItems: "center", fontSize: 11.5, lineHeight: 1.25 }}>
                  <span style={{ width: 9, height: 9, borderRadius: 99, background: item.color }} />
                  <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontWeight: 700 }}>{item.label}</span>
                  <span className="num" style={{ color: "var(--ink-soft)", fontWeight: 800 }}>
                    {num(item.value)}人 / {denominator ? pct1(item.value / denominator) : "—"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ minHeight: 152, display: "grid", placeItems: "center", color: "var(--ink-faint)", fontSize: 12 }}>
            表示できるデータがありません。
          </div>
        )}
      </div>
    );
  };
  const DonutGroup = ({ title, sourceRows }) => (
    <div style={{ display: "grid", gap: 10, marginBottom: 14 }}>
      <div style={{ fontWeight: 800, fontSize: 13, color: "var(--ink-soft)" }}>{title}</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12 }}>
        {columns.map((col) => (
          <DonutCard
            key={col.key}
            title={col.label}
            rows={buildDonutItems(sourceRows, col.key)}
            denominator={selectedCounts[col.key]}
          />
        ))}
      </div>
    </div>
  );
  const KpiBox = ({ label, value, sub, children }) => (
    <div className="f4h-card" style={{ padding: 14, display: "grid", gap: 7, minWidth: 0 }}>
      <div style={{ fontSize: 11.5, color: "var(--ink-soft)", fontWeight: 800 }}>{label}</div>
      <div className="num" style={{ fontSize: 25, fontWeight: 800, lineHeight: 1.1 }}>{value}</div>
      <div style={{ fontSize: 11, color: "var(--ink-faint)", minHeight: 15 }}>{sub}</div>
      {children}
    </div>
  );
  const periodTabs = [
    { key: "all", label: "全期間" },
    { key: "current", label: "当月" },
    { key: "previous", label: "前月" },
    { key: "recent3", label: "直近3ヶ月" },
    { key: "recent6", label: "直近6ヶ月" },
    { key: "custom", label: "期間指定" },
  ];
  const storeTabs = [
    { key: "all", label: "全店" },
    ...STORE_KEYS.map((s) => ({ key: s, label: s })),
  ];
  const startParts = customStartYm.split("-").map(Number);
  const endParts = customEndYm.split("-").map(Number);
  const periodSummaryLabel = period.mode === "all" ? "全期間" : period.label;
  const isSinglePeriodMonth = period.months.length === 1;
  const detailBandOptions = ["3ヶ月以内", "4〜6ヶ月", "7〜12ヶ月", "13ヶ月以上"];
  const detailRows = useMemo(() => {
    const memberQuery = detailMemberIdQuery.trim().toLowerCase();
    const nameQuery = detailNameQuery.trim().toLowerCase();
    return selectedRows
      .map((row) => {
        const oldTenureMonths = row?.planContractDate && row?.planEndDate
          ? monthsBetween(row.planContractDate, row.planEndDate)
          : null;
        const newTenureMonths = cancellationTenureMonths(row);
        const oldTenureBand = tenureBandOf(oldTenureMonths);
        const newTenureBand = cancellationTenureBand(row);
        const diffMonths = oldTenureMonths != null && newTenureMonths != null
          ? newTenureMonths - oldTenureMonths
          : null;
        return {
          ...row,
          oldTenureMonths,
          newTenureMonths,
          diffMonths,
          oldTenureBand,
          newTenureBand,
          tenureBandChanged: !!oldTenureBand && !!newTenureBand && oldTenureBand !== newTenureBand,
        };
      })
      .filter((row) => {
        if (memberQuery && !String(row.memberId || "").toLowerCase().includes(memberQuery)) return false;
        if (nameQuery && !String(row.name || "").toLowerCase().includes(nameQuery)) return false;
        if (detailStoreFilter !== "all" && matchStoreName(row.store || "") !== detailStoreFilter) return false;
        if (detailBandFilter !== "all" && row.newTenureBand !== detailBandFilter) return false;
        if (detailBandChangedOnly && !row.tenureBandChanged) return false;
        return true;
      })
      .sort((a, b) => (
        String(b.planEndDate || "").localeCompare(String(a.planEndDate || "")) ||
        String(a.memberId || "").localeCompare(String(b.memberId || ""))
      ));
  }, [selectedRows, detailMemberIdQuery, detailNameQuery, detailStoreFilter, detailBandFilter, detailBandChangedOnly]);
  const visibleDetailRows = detailRows.slice(0, 100);

  if (!rows.length) {
    return (
      <div className="f4h-fade-in" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <SectionHeading eyebrow="退会分析" title="退会者CSVの分析" />
        <SubTabs tabs={[
          { key: "summary", label: "退会サマリー" },
          { key: "survey", label: "退会理由分析" },
        ]} active={analysisTab} onChange={setAnalysisTab} />
        {analysisTab === "summary" ? (
          <div className="f4h-card">
            <EmptyState
              icon={UserMinus}
              title="退会者CSVがまだ取り込まれていません。"
              sub="データ入力 > 退会者CSV からCSVを取り込んでください。"
            />
          </div>
        ) : (
          <CancellationSurveyAnalysisView data={data} />
        )}
      </div>
    );
  }

  return (
    <div className="f4h-fade-in" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <SectionHeading
        eyebrow="退会分析"
        title="退会者CSVの分析"
      />

      <SubTabs tabs={[
        { key: "summary", label: "退会サマリー" },
        { key: "survey", label: "退会理由分析" },
      ]} active={analysisTab} onChange={setAnalysisTab} />

      {analysisTab === "summary" ? (
      <>
      <div className="f4h-card" style={{ padding: 14, display: "grid", gap: 10 }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
          {periodTabs.map((tab) => (
            <button
              key={tab.key}
              className={`f4h-btn f4h-focus ${periodMode === tab.key ? "f4h-btn-primary" : "f4h-btn-outline"}`}
              style={{ padding: "7px 12px", fontSize: 12.5 }}
              onClick={() => setPeriodMode(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
          <span style={{ fontSize: 12, color: "var(--ink-faint)", fontWeight: 700 }}>店舗</span>
          {storeTabs.map((tab) => (
            <button
              key={tab.key}
              className={`f4h-btn f4h-focus ${storeFilter === tab.key ? "f4h-btn-primary" : "f4h-btn-outline"}`}
              style={{ padding: "7px 12px", fontSize: 12.5 }}
              onClick={() => setStoreFilter(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {periodMode === "custom" && (
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ fontSize: 12, color: "var(--ink-faint)", fontWeight: 700 }}>開始</span>
            <MonthPicker year={startParts[0]} month={startParts[1]} onChange={(y, m) => setCustomStartYm(cancellationYm(y, m))} />
            <span style={{ fontSize: 12, color: "var(--ink-faint)", fontWeight: 700 }}>終了</span>
            <MonthPicker year={endParts[0]} month={endParts[1]} onChange={(y, m) => setCustomEndYm(cancellationYm(y, m))} />
          </div>
        )}
      </div>

      <div className="f4h-card" style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ display: "flex", gap: 18, flexWrap: "wrap", fontSize: 12.5, color: "var(--ink-soft)" }}>
          <span>対象期間 <b className="num">{periodSummaryLabel}</b></span>
          <span>対象店舗 <b>{storeFilterLabel}</b></span>
          <span>保存済み退会者明細 <b className="num">{rows.length}</b>件</span>
          <span>選択条件の退会者明細 <b className="num">{selectedRows.length}</b>件</span>
          <span>最終取込日時 <b>{importedAt}</b></span>
          <span>元ファイル名 <b>{data.cancellations?.source?.filename || "—"}</b></span>
        </div>
        <div style={{ fontSize: 11.5, color: "var(--ink-faint)", lineHeight: 1.7 }}>
          退会分析は退会者CSVの明細データをもとに集計しています。既存の月次レポート・退会率計算には反映していません。
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <AiAssistantButton onClick={() => setAiOpen(true)} />
      </div>

      {selectedRows.length === 0 && (
        <div className="f4h-card">
          <EmptyState
            icon={UserMinus}
            title="選択条件に該当する退会者データはありません。"
            sub="期間または店舗を変更してください。保存済みデータ全体がない場合は、データ入力 > 退会者CSV からCSVを取り込んでください。"
          />
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 12 }}>
        <KpiBox label="退会者数" value={`${num(selectedCounts.all)}人`} sub={`退会者CSV集計・${storeFilterLabel}`} />
        <KpiBox label="月次実績との差分" value={diffAll == null ? "—" : `${signed(diffAll)}人`} sub="月次実績に登録された退会数との差">
          <div style={{ marginTop: -2 }}><DeltaTag value={diffAll} suffix="人" /></div>
        </KpiBox>
        <KpiBox label="退会手続き件数" value={`${num(weeklyRequestTotal)}人`} sub={`退会手続き日ベース・${storeFilterLabel}`} />
        <KpiBox label="平均在籍月数" value={tenureMonthText(tenureAnalysis.stats.all.avg)} sub={`${storeFilterLabel}・算出可能データ`} />
      </div>

      <div className="f4h-card scrollbar-thin" style={denseCardStyle}>
        <div style={sectionTitleStyle}>月次退会サマリー（{periodSummaryLabel}・{storeFilterLabel}）</div>
        <table className="f4h-table" style={{ fontSize: 12.5 }}>
          <thead>
            <tr>
              <th>項目</th>
              {columns.map((col) => <th key={col.key}>{storeHead(col)}</th>)}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ fontWeight: 700 }}>退会者CSV集計</td>
              {columns.map((col) => <td key={col.key} className="num">{num(selectedCounts[col.key])}人</td>)}
            </tr>
            <tr>
              <td style={{ fontWeight: 700 }}>月次実績</td>
              {columns.map((col) => (
                <td key={col.key} className="num">{confirmedCounts[col.key] == null ? "—" : `${num(confirmedCounts[col.key])}人`}</td>
              ))}
            </tr>
            <tr>
              <td style={{ fontWeight: 700 }}>差分</td>
              {columns.map((col) => {
                const confirmed = confirmedCounts[col.key];
                const diff = confirmed == null ? null : selectedCounts[col.key] - confirmed;
                return <td key={col.key} className="num"><DeltaTag value={diff} suffix="人" /></td>;
              })}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="f4h-card scrollbar-thin" style={denseCardStyle}>
        <div style={sectionTitleStyle}>退会手続き週別サマリー（{periodSummaryLabel}・{storeFilterLabel}）</div>
        {weeklyRequestTotal === 0 && (
          <div style={{ fontSize: 12.5, color: "var(--ink-soft)", marginBottom: 10 }}>
            対象月に退会手続き日がある退会データはありません。
          </div>
        )}
        <table className="f4h-table" style={{ fontSize: 12.5 }}>
          <thead>
            <tr>
              <th>期間</th>
              {columns.map((col) => <th key={col.key}>{storeHead(col)}</th>)}
            </tr>
          </thead>
          <tbody>
            {weeklyRequestRows.map((row) => (
              <tr key={row.label}>
                <td style={{ fontWeight: 800, color: "var(--ink)" }}>{row.label}</td>
                {columns.map((col) => (
                  <td key={col.key} className="num">{metricCell(row[col.key], "退会手続き数")}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div style={noteStyle}>
          退会手続き週別サマリーは、退会手続き日ベースで集計しています。退会手続き日がないデータはこの集計から除外しています。
          {!isSinglePeriodMonth && " 複数月選択時は、各月の同じ週区分を合算しています。"}
        </div>
      </div>

      <div className="f4h-card scrollbar-thin" style={denseCardStyle}>
        <div style={sectionTitleStyle}>在籍期間分析（{periodSummaryLabel}・{storeFilterLabel}）</div>
        {tenureValidTotal === 0 && (
          <div style={{ fontSize: 12.5, color: "var(--ink-soft)", marginBottom: 10 }}>
            対象月に在籍期間を計算できる退会データはありません。
          </div>
        )}
        <DonutGroup title="在籍期間構成グラフ" sourceRows={tenureAnalysis.bands} />
        <table className="f4h-table" style={{ fontSize: 12.5 }}>
          <thead>
            <tr>
              <th>期間</th>
              {columns.map((col) => <th key={col.key}>{storeHead(col)}</th>)}
            </tr>
          </thead>
          <tbody>
            {tenureAnalysis.bands.map((row) => (
              <tr key={row.label}>
                <td style={{ fontWeight: 800 }}>{row.label}</td>
                {columns.map((col) => {
                  const denominator = selectedCounts[col.key];
                  return <td key={col.key} className="num">{ratioCell(row[col.key], denominator)}</td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <table className="f4h-table" style={{ marginTop: 12, fontSize: 12.5 }}>
          <thead>
            <tr>
              <th>指標</th>
              {columns.map((col) => <th key={col.key}>{storeHead(col)}</th>)}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ fontWeight: 700 }}>平均在籍月数</td>
              {columns.map((col) => <td key={col.key} className="num">{tenureMonthText(tenureAnalysis.stats[col.key]?.avg)}</td>)}
            </tr>
            <tr>
              <td style={{ fontWeight: 700 }}>中央値在籍月数</td>
              {columns.map((col) => <td key={col.key} className="num">{tenureMonthText(tenureAnalysis.stats[col.key]?.median)}</td>)}
            </tr>
          </tbody>
        </table>
        <div style={noteStyle}>
          在籍期間は原則「入会日時」から「プラン契約適用終了日」までで計算しています。入会日時がない場合のみ「プラン契約日」で補完します。プラン契約適用開始日は、休会・プラン変更の影響を受けるため在籍期間の起点には使用していません。終了日がないデータは、この分析から除外しています。
        </div>
        <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid var(--border-soft)" }}>
          <div style={{ ...sectionTitleStyle, marginBottom: 8 }}>年齢別 在籍期間分析</div>
          <div style={{ fontSize: 11.5, color: "var(--ink-faint)", lineHeight: 1.6, marginBottom: 10 }}>
            年齢別の平均・中央値在籍月数も、原則「入会日時」から「プラン契約適用終了日」までで計算しています。入会日時がない場合のみ「プラン契約日」で補完します。
            {ageTenureAnalysis.excludedCount > 0 && ` 在籍期間の開始日または終了日がないため除外したデータは${num(ageTenureAnalysis.excludedCount)}件です。`}
          </div>
          <table className="f4h-table" style={{ fontSize: 12.5 }}>
            <thead>
              <tr>
                <th>年齢帯</th>
                <th>退会者数</th>
                <th>平均在籍月数</th>
                <th>中央値在籍月数</th>
                <th>3ヶ月以内</th>
                <th>4〜6ヶ月</th>
                <th>7〜12ヶ月</th>
                <th>13ヶ月以上</th>
              </tr>
            </thead>
            <tbody>
              {ageTenureAnalysis.rows.map((row) => (
                <tr key={row.label}>
                  <td style={{ fontWeight: 800 }}>{row.label}</td>
                  <td className="num">{num(row.count)}人</td>
                  <td className="num">{tenureMonthText(row.avg)}</td>
                  <td className="num">{tenureMonthText(row.median)}</td>
                  <td className="num">{num(row["3ヶ月以内"])}人</td>
                  <td className="num">{num(row["4〜6ヶ月"])}人</td>
                  <td className="num">{num(row["7〜12ヶ月"])}人</td>
                  <td className="num">{num(row["13ヶ月以上"])}人</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <div style={sectionTitleStyle}>属性別退会者構成（{periodSummaryLabel}・{storeFilterLabel}）</div>
        <DonutGroup title="年齢層別退会者構成グラフ" sourceRows={attributeBreakdown.ageRows} />
        <DonutGroup title="性別別退会者構成グラフ" sourceRows={attributeBreakdown.genderRows} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: 12 }}>
          <div className="f4h-card scrollbar-thin" style={denseCardStyle}>
            <div style={{ fontWeight: 800, fontSize: 13, color: "var(--ink-soft)", marginBottom: 8 }}>年齢層別退会者構成</div>
            <table className="f4h-table" style={{ fontSize: 12.3 }}>
              <thead>
                <tr>
                  <th>年齢層</th>
                  {columns.map((col) => <th key={col.key}>{storeHead(col)}</th>)}
                </tr>
              </thead>
              <tbody>
                {attributeBreakdown.ageRows.map((row) => (
                  <tr key={row.label}>
                    <td style={{ fontWeight: 800 }}>{row.label}</td>
                    {columns.map((col) => (
                      <td key={col.key} className="num">{renderAttributeCell(row[col.key], selectedCounts[col.key])}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="f4h-card scrollbar-thin" style={denseCardStyle}>
            <div style={{ fontWeight: 800, fontSize: 13, color: "var(--ink-soft)", marginBottom: 8 }}>性別別退会者構成</div>
            <table className="f4h-table" style={{ fontSize: 12.3 }}>
              <thead>
                <tr>
                  <th>性別</th>
                  {columns.map((col) => <th key={col.key}>{storeHead(col)}</th>)}
                </tr>
              </thead>
              <tbody>
                {attributeBreakdown.genderRows.map((row) => (
                  <tr key={row.label}>
                    <td style={{ fontWeight: 800 }}>{row.label}</td>
                    {columns.map((col) => (
                      <td key={col.key} className="num">{renderAttributeCell(row[col.key], selectedCounts[col.key])}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div style={{ ...noteStyle, marginLeft: 2 }}>
          属性別退会者構成は、退会者CSVに含まれる退会者の内訳です。年代別・性別ごとの在籍者母数を使った退会率ではありません。
        </div>
      </div>

      <div className="f4h-card scrollbar-thin" style={{ padding: 14, overflowX: "auto" }}>
        <div style={{ fontWeight: 800, fontSize: 12.5, color: "var(--ink-soft)", marginBottom: 8 }}>月別退会数一覧（{storeFilterLabel}）</div>
        <table className="f4h-table" style={{ fontSize: 12 }}>
          <thead>
            <tr>
              <th>月</th>
              {columns.map((col) => <th key={col.key}>{storeHead(col)}</th>)}
            </tr>
          </thead>
          <tbody>
            {monthlyRows.map((row) => (
              <tr key={row.ym} style={{ cursor: "pointer" }} onClick={() => { setPeriodMode("custom"); setCustomStartYm(row.ym); setCustomEndYm(row.ym); }}>
                <td style={{ fontWeight: 700 }}>{row.year}年{row.month}月</td>
                {columns.map((col) => <td key={col.key} className="num">{num(row[col.key])}人</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {storeFilter === "all" ? (
        <div className="f4h-card scrollbar-thin" style={{ padding: 14, overflowX: "auto" }}>
          <div style={{ fontWeight: 800, fontSize: 12.5, color: "var(--ink-soft)", marginBottom: 8 }}>店舗別退会数（{periodSummaryLabel}）</div>
          <table className="f4h-table" style={{ fontSize: 12 }}>
            <thead><tr><th>店舗</th><th>退会数</th></tr></thead>
            <tbody>
              {columns.map((col) => (
                <tr key={col.key}>
                  <td style={{ fontWeight: col.key === "all" ? 800 : 700 }}>{storeHead(col)}</td>
                  <td className="num" style={{ fontWeight: 800 }}>{num(selectedCounts[col.key])}人</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ fontSize: 11.5, color: "var(--ink-faint)", lineHeight: 1.7 }}>
          店舗別退会数は全店選択時のみ表示します。現在は{storeFilterLabel}のみを表示しています。
        </div>
      )}

      <div className="f4h-card" style={{ padding: 0, overflow: "hidden" }}>
        <button
          type="button"
          className="f4h-focus"
          aria-expanded={detailOpen}
          onClick={() => setDetailOpen((v) => !v)}
          style={{
            width: "100%",
            border: 0,
            background: "transparent",
            color: "var(--ink)",
            cursor: "pointer",
            padding: "14px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            textAlign: "left",
          }}
        >
          <span style={{ display: "grid", gap: 2 }}>
            <span style={{ fontWeight: 800, fontSize: 14 }}>退会者個別データ一覧（クリックで{detailOpen ? "閉じる" : "開く"}）</span>
            <span style={{ fontSize: 11.5, color: "var(--ink-faint)", fontWeight: 600 }}>
              在籍月数は保存済み値ではなく、表示時に旧ロジックと新ロジックを再計算します。
            </span>
          </span>
          {detailOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
        </button>

        {detailOpen && (
          <div style={{ borderTop: "1px solid var(--border-soft)", padding: 16, display: "grid", gap: 12 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 10, alignItems: "end" }}>
              <label style={{ display: "grid", gap: 5, fontSize: 11.5, color: "var(--ink-soft)", fontWeight: 800 }}>
                メンバーID検索
                <input
                  className="f4h-input"
                  value={detailMemberIdQuery}
                  onChange={(e) => setDetailMemberIdQuery(e.target.value)}
                  placeholder="例: 492"
                  style={{ fontSize: 12.5 }}
                />
              </label>
              <label style={{ display: "grid", gap: 5, fontSize: 11.5, color: "var(--ink-soft)", fontWeight: 800 }}>
                氏名検索
                <input
                  className="f4h-input"
                  value={detailNameQuery}
                  onChange={(e) => setDetailNameQuery(e.target.value)}
                  placeholder="例: 磯邊 あき"
                  style={{ fontSize: 12.5 }}
                />
              </label>
              <label style={{ display: "grid", gap: 5, fontSize: 11.5, color: "var(--ink-soft)", fontWeight: 800 }}>
                店舗フィルター
                <select className="f4h-input" value={detailStoreFilter} onChange={(e) => setDetailStoreFilter(e.target.value)} style={{ fontSize: 12.5 }}>
                  <option value="all">全店</option>
                  {STORE_KEYS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </label>
              <label style={{ display: "grid", gap: 5, fontSize: 11.5, color: "var(--ink-soft)", fontWeight: 800 }}>
                tenureBandフィルター
                <select className="f4h-input" value={detailBandFilter} onChange={(e) => setDetailBandFilter(e.target.value)} style={{ fontSize: 12.5 }}>
                  <option value="all">すべて</option>
                  {detailBandOptions.map((band) => <option key={band} value={band}>{band}</option>)}
                </select>
              </label>
              <label style={{ display: "inline-flex", gap: 8, alignItems: "center", fontSize: 12, color: "var(--ink-soft)", fontWeight: 800, minHeight: 38 }}>
                <input
                  type="checkbox"
                  checked={detailBandChangedOnly}
                  onChange={(e) => setDetailBandChangedOnly(e.target.checked)}
                />
                tenureBand変更ありのみ
              </label>
            </div>

            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", fontSize: 12, color: "var(--ink-faint)" }}>
              <span>表示対象 <b className="num">{num(detailRows.length)}</b>件</span>
              {detailRows.length > visibleDetailRows.length && <span>先頭 <b className="num">{num(visibleDetailRows.length)}</b>件を表示中。検索で絞り込めます。</span>}
              <span>対象条件 <b>{periodSummaryLabel}</b> / <b>{storeFilterLabel}</b></span>
            </div>

            <div className="scrollbar-thin" style={{ overflowX: "auto", border: "1px solid var(--border-soft)", borderRadius: 8 }}>
              <table className="f4h-table" style={{ fontSize: 12, minWidth: 1120 }}>
                <thead>
                  <tr>
                    <th>メンバーID</th>
                    <th>氏名</th>
                    <th>店舗</th>
                    <th>年齢</th>
                    <th>入会日時</th>
                    <th>プラン契約日</th>
                    <th>プラン契約適用終了日</th>
                    <th>旧ロジック在籍月数</th>
                    <th>新ロジック在籍月数</th>
                    <th>差分月数</th>
                    <th>新tenureBand</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleDetailRows.length === 0 ? (
                    <tr>
                      <td colSpan={11} style={{ textAlign: "center", color: "var(--ink-faint)", padding: 18 }}>
                        条件に一致する退会者データはありません。
                      </td>
                    </tr>
                  ) : visibleDetailRows.map((row) => (
                    <tr key={`${row.memberId || ""}-${row.planEndDate || ""}-${row.store || ""}`}>
                      <td className="num" style={{ fontWeight: 800 }}>{row.memberId || "—"}</td>
                      <td style={{ textAlign: "left", fontWeight: 700 }}>{row.name || "—"}</td>
                      <td>{matchStoreName(row.store || "") || row.store || "—"}</td>
                      <td className="num">{row.age ?? "—"}</td>
                      <td className="num">{row.joinDate || "—"}</td>
                      <td className="num">{row.planContractDate || "—"}</td>
                      <td className="num">{row.planEndDate || "—"}</td>
                      <td className="num">{row.oldTenureMonths == null ? "算出不可" : tenureMonthText(row.oldTenureMonths)}</td>
                      <td className="num" style={{ fontWeight: 800 }}>{row.newTenureMonths == null ? "算出不可" : tenureMonthText(row.newTenureMonths)}</td>
                      <td className="num">{row.diffMonths == null ? "—" : signed(row.diffMonths) + "ヶ月"}</td>
                      <td style={{ fontWeight: 800 }}>{row.newTenureBand || "算出不可"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      {aiOpen && (
        <AiPromptModal
          data={data}
          settings={data.aiAssistantSettings}
          context={{
            cancellationRows: selectedRows,
            cancellationLabel: `退会サマリー: ${periodSummaryLabel} / ${storeFilterLabel}`,
          }}
          showToast={showToast}
          onClose={() => setAiOpen(false)}
        />
      )}
      </>
      ) : (
        <CancellationSurveyAnalysisView
          data={data}
          showToast={showToast}
          aiContext={{ cancellationRows: selectedRows, cancellationLabel: `退会サマリー: ${periodSummaryLabel} / ${storeFilterLabel}` }}
        />
      )}
    </div>
  );
}

// ============================================================
// データ入力：体験者データ取込
// ============================================================
function MappingRow({ field, headers, value, onChange }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ width: 96, fontSize: 12.5, fontWeight: 600, color: "var(--ink-soft)", flexShrink: 0 }}>
        {field.label}{field.required && <span style={{ color: "var(--red)" }}> *</span>}
      </div>
      <select className="f4h-input" value={value} onChange={(e) => onChange(field.key, e.target.value)}>
        <option value="">（なし）</option>
        {headers.map((h) => <option key={h} value={h}>{h}</option>)}
      </select>
    </div>
  );
}

function TrialImportPanel({ data, updateData, showToast }) {
  const [csvText, setCsvText] = useState("");
  const [rawRows, setRawRows] = useState(null);
  const [headers, setHeaders] = useState([]);
  const [mapping, setMapping] = useState(null);
  const [confirmClear, setConfirmClear] = useState(false);
  const [filterStore, setFilterStore] = useState("");
  const [filterUnassigned, setFilterUnassigned] = useState(false);
  const [filterOptOut, setFilterOptOut] = useState(false);
  const [filterNoshow, setFilterNoshow] = useState(false);
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(40);
  const [delTarget, setDelTarget] = useState(null);
  const [selectedTrialIds, setSelectedTrialIds] = useState([]);
  const fileRef = useRef(null);

  const doParse = useCallback((text) => {
    // BOM除去・行末正規化
    const clean = text.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
    Papa.parse(clean, {
      header: true, skipEmptyLines: true,
      complete: (res) => {
        const hdrs = res.meta.fields || [];
        setHeaders(hdrs);
        setRawRows(res.data);
        setMapping(suggestMapping(hdrs));
      },
      error: () => showToast("CSVの解析に失敗しました。", true),
    });
  }, [showToast]);

  const onFile = useCallback((e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target.result;
      setCsvText(text);
      doParse(text);
    };
    reader.onerror = () => showToast("ファイルの読み込みに失敗しました。", true);
    reader.readAsText(f, "UTF-8");
  }, [doParse, showToast]);

  const onParseText = useCallback(() => { if (csvText.trim()) doParse(csvText); }, [csvText, doParse]);

  const cleaned = useMemo(() => {
    if (!rawRows || !mapping) return [];
    return cleanCsvRows(rawRows, mapping);
  }, [rawRows, mapping]);

  const dedup = useMemo(() => dedupeAgainstExisting(cleaned, data.trials), [cleaned, data.trials]);

  const handleImport = async () => {
    if (!dedup.accepted.length) { showToast("取り込める新規データがありません。", true); return; }
    let nextId = nextTrialId(data.trials);
    const newRows = dedup.accepted.map((r) => {
      const id = nextId; nextId = `t${Number(nextId.slice(1)) + 1}`;
      return { id, ...r };
    });
    await updateData("trials", (cur) => [...cur, ...newRows]);
    showToast(`${newRows.length}件を取り込みました（重複スキップ${dedup.skipped}件）`);
    setCsvText(""); setRawRows(null); setHeaders([]); setMapping(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const setMap = (key, val) => setMapping((m) => ({ ...m, [key]: val }));

  const filteredTrials = useMemo(() => {
    let rows = [...data.trials].sort((a, b) => (b.lessonDate || "").localeCompare(a.lessonDate || ""));
    if (filterStore) rows = rows.filter((t) => t.store === filterStore);
    if (filterUnassigned) rows = rows.filter((t) => !t.staff);
    if (filterOptOut) rows = rows.filter((t) => t.staff === EXCLUDED_STAFF);
    if (filterNoshow) rows = rows.filter((t) => t.manualJoinMonth === NOSHOW_MARKER);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      rows = rows.filter((t) => (t.name || "").toLowerCase().includes(q) || (t.memberId || "").includes(q));
    }
    return rows;
  }, [data.trials, filterStore, filterUnassigned, filterOptOut, filterNoshow, search]);

  const optOutCount = data.trials.filter((t) => t.staff === EXCLUDED_STAFF).length;
  const noshowCount = data.trials.filter((t) => t.manualJoinMonth === NOSHOW_MARKER).length;

  const unassignedCount = data.trials.filter((t) => !t.staff && t.store).length;
  const visibleTrials = filteredTrials.slice(0, visibleCount);
  const visibleTrialIds = useMemo(() => visibleTrials.map((t) => t.id), [visibleTrials]);
  const visibleIdSet = useMemo(() => new Set(visibleTrialIds), [visibleTrialIds]);
  const allVisibleSelected = visibleTrialIds.length > 0 && visibleTrialIds.every((id) => selectedTrialIds.includes(id));
  const someVisibleSelected = visibleTrialIds.some((id) => selectedTrialIds.includes(id));

  const joinsMap = useMemo(() => buildJoinsMap(data.joins), [data.joins]);

  useEffect(() => {
    const filteredIds = new Set(filteredTrials.map((t) => t.id));
    setSelectedTrialIds((ids) => ids.filter((id) => filteredIds.has(id)));
  }, [filteredTrials]);

  const setStaffFor = async (id, staff) => {
    await updateData("trials", (cur) => cur.map((t) => (t.id === id ? { ...t, staff } : t)));
  };
  const setJoinMonthFor = async (id, value) => {
    const manualJoinMonth = value === "" ? null : value === NOSHOW_MARKER ? NOSHOW_MARKER : Number(value);
    await updateData("trials", (cur) => cur.map((t) => (t.id === id ? { ...t, manualJoinMonth } : t)));
  };
  const deleteTrial = async (id) => {
    await updateData("trials", (cur) => cur.filter((t) => t.id !== id));
    setSelectedTrialIds((ids) => ids.filter((selectedId) => selectedId !== id));
    setDelTarget(null);
    showToast("削除しました");
  };
  const toggleTrialSelection = (id, checked) => {
    setSelectedTrialIds((ids) => {
      if (checked) return ids.includes(id) ? ids : [...ids, id];
      return ids.filter((selectedId) => selectedId !== id);
    });
  };
  const toggleAllVisibleTrials = (checked) => {
    setSelectedTrialIds((ids) => {
      const current = new Set(ids);
      for (const id of visibleTrialIds) {
        if (checked) current.add(id);
        else current.delete(id);
      }
      return [...current];
    });
  };
  const deleteSelectedTrials = async () => {
    const idsToDelete = selectedTrialIds.filter((id) => data.trials.some((t) => t.id === id));
    if (!idsToDelete.length) return;
    if (!window.confirm(`選択した${idsToDelete.length}件の体験者データを削除します。よろしいですか？`)) return;
    const deleteSet = new Set(idsToDelete);
    await updateData("trials", (cur) => cur.filter((t) => !deleteSet.has(t.id)));
    setSelectedTrialIds([]);
    showToast(`${idsToDelete.length}件を削除しました`);
  };

  const mappingValid = mapping && mapping.store && mapping.ticket && mapping.lessonDate;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div className="f4h-card" style={{ padding: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <Upload size={16} /><div style={{ fontWeight: 700, fontSize: 14 }}>hacomonoの予約一覧CSVを取り込む</div>
        </div>
        <p style={{ fontSize: 12.5, color: "var(--ink-faint)", margin: "2px 0 14px" }}>
          hacomono「データ集計＞予約＞自由枠：予約一覧」でエクスポートしたCSVをそのまま貼り付けるか、ファイルを選択してください。無料体験チケットの行だけ自動で抽出し、店舗表記のゆれ（4H/5H誤記など）も自動修正、既存データとの重複もスキップします。
        </p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 10 }}>
          <button className="f4h-btn f4h-btn-outline f4h-focus" style={{ padding: "8px 14px" }} onClick={() => fileRef.current?.click()}>
            <Upload size={14} /> CSVファイルを選択
          </button>
          <input ref={fileRef} type="file" accept=".csv,text/csv" style={{ display: "none" }} onChange={onFile} />
          <span style={{ fontSize: 12, color: "var(--ink-faint)", alignSelf: "center" }}>または下に貼り付け↓</span>
        </div>
        <textarea className="f4h-input" rows={4} placeholder="CSVの内容をここに貼り付け…"
          style={{ resize: "vertical", fontFamily: "monospace", fontSize: 12 }}
          value={csvText} onChange={(e) => setCsvText(e.target.value)} />
        <div style={{ marginTop: 8, display: "flex", gap: 8, alignItems: "center" }}>
          <button className="f4h-btn f4h-btn-primary f4h-focus" style={{ padding: "8px 16px" }} onClick={onParseText} disabled={!csvText.trim()}>
            読み込む
          </button>
          <button className="f4h-btn f4h-btn-outline f4h-focus" style={{ padding: "8px 14px" }}
            disabled={!csvText && !rawRows}
            onClick={() => { setCsvText(""); setRawRows(null); setHeaders([]); setMapping(null); if (fileRef.current) fileRef.current.value = ""; }}>
            <X size={13} /> リセット
          </button>
        </div>

        {rawRows && (
          <div className="f4h-fade-in" style={{ marginTop: 18, borderTop: "1px solid var(--border-soft)", paddingTop: 16 }}>
            <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10 }}>列の対応づけ（{rawRows.length}行を検出）</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px,1fr))", gap: 10, marginBottom: 14 }}>
              {REQUIRED_TRIAL_FIELDS.map((f) => (
                <MappingRow key={f.key} field={f} headers={headers} value={mapping[f.key] || ""} onChange={setMap} />
              ))}
            </div>
            {!mappingValid && (
              <div style={{ display: "flex", gap: 6, alignItems: "center", color: "var(--red)", fontSize: 12.5, marginBottom: 10 }}>
                <AlertTriangle size={14} /> 店舗・使用チケット・受講日は必須項目です
              </div>
            )}
            {mappingValid && (
              <>
                <div style={{ display: "flex", gap: 14, fontSize: 12.5, color: "var(--ink-soft)", marginBottom: 8, flexWrap: "wrap" }}>
                  <span>無料体験対象 <b className="num">{cleaned.length}</b>件</span>
                  <span>新規取込 <b className="num" style={{ color: "var(--go)" }}>{dedup.accepted.length}</b>件</span>
                  <span>重複スキップ <b className="num" style={{ color: "var(--ink-faint)" }}>{dedup.skipped}</b>件</span>
                </div>
                <div className="scrollbar-thin" style={{ maxHeight: 220, overflow: "auto", border: "1px solid var(--border-soft)", borderRadius: 8, marginBottom: 12 }}>
                  <table className="f4h-table">
                    <thead><tr><th>店舗</th><th>受講日</th><th>メンバーID</th><th>氏名</th><th>状態</th></tr></thead>
                    <tbody>
                      {dedup.accepted.slice(0, 50).map((r, i) => (
                        <tr key={i}>
                          <td style={{ textAlign: "left" }}>{r.store || <span style={{ color: "var(--red)" }}>未判定</span>}</td>
                          <td>{r.lessonDate || "—"}</td><td>{r.memberId || "—"}</td>
                          <td style={{ textAlign: "left" }}>{r.name || "—"}</td>
                          <td><span className="f4h-tone-go" style={{ borderRadius: 999, padding: "1px 8px", fontSize: 11, fontWeight: 700 }}>新規</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button className="f4h-btn f4h-btn-primary f4h-focus" style={{ padding: "9px 18px" }} onClick={handleImport} disabled={!dedup.accepted.length}>
                  <Check size={15} /> {dedup.accepted.length}件を取り込む
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {unassignedCount > 0 && (
        <div className="f4h-card" style={{ padding: "10px 16px", display: "flex", alignItems: "center", gap: 10, background: "var(--amber-soft)", borderColor: "transparent" }}>
          <AlertTriangle size={16} color="var(--amber)" />
          <span style={{ fontSize: 12.5, color: "var(--ink)" }}>担当者が未設定の体験記録が <b>{unassignedCount}</b> 件あります。下の一覧で「未設定のみ」を絞り込んで設定できます。</span>
        </div>
      )}
      {noshowCount > 0 && (
        <div className="f4h-card" style={{ padding: "10px 16px", display: "flex", alignItems: "center", gap: 10 }}>
          <Info size={16} color="var(--ink-faint)" />
          <span style={{ fontSize: 12.5, color: "var(--ink-soft)" }}>
            入会月を「来店無し」にした体験記録は <b className="num">{noshowCount}</b> 件あります。予約はしたが当日来店しなかった記録として残りますが、体験数・CVRどちらの集計からも除外されます。
          </span>
        </div>
      )}

      <div className="f4h-card" style={{ padding: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10, marginBottom: 12 }}>
          <div style={{ fontWeight: 700, fontSize: 14 }}>体験者データ一覧（{data.trials.length}件）</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
            <input className="f4h-input" style={{ width: 150 }} placeholder="氏名・IDで検索" value={search} onChange={(e) => setSearch(e.target.value)} />
            <Pill active={filterStore === ""} onClick={() => setFilterStore("")}>全店</Pill>
            {STORE_DEFS.map((s) => <Pill key={s.key} active={filterStore === s.key} onClick={() => setFilterStore(s.key)}>{s.key}</Pill>)}
            <Pill active={filterUnassigned} onClick={() => setFilterUnassigned((v) => !v)}>担当者未設定のみ</Pill>
            <Pill active={filterOptOut} onClick={() => setFilterOptOut((v) => !v)}>入会意思なしのみ{optOutCount > 0 ? `（${optOutCount}）` : ""}</Pill>
            <Pill active={filterNoshow} onClick={() => setFilterNoshow((v) => !v)}>来店無しのみ{noshowCount > 0 ? `（${noshowCount}）` : ""}</Pill>
          </div>
        </div>
        {selectedTrialIds.length > 0 && (
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 12, padding: "9px 12px", border: "1px solid var(--border-soft)", borderRadius: 8, background: "var(--surface-soft)" }}>
            <div style={{ fontSize: 12.5, color: "var(--ink-soft)" }}>選択中：<b className="num">{selectedTrialIds.length}</b>件</div>
            <button className="f4h-btn f4h-btn-danger f4h-focus" style={{ padding: "7px 12px" }} onClick={deleteSelectedTrials}>
              <Trash2 size={14} /> 選択削除
            </button>
          </div>
        )}
        {filteredTrials.length === 0 ? (
          <EmptyState icon={Upload} title="該当する体験データがありません" sub="上のフォームからCSVを取り込んでください。" />
        ) : (
          <>
            <div className="scrollbar-thin" style={{ overflow: "auto" }}>
              <table className="f4h-table">
                <thead><tr><th style={{ width: 34 }}>
                  <input
                    type="checkbox"
                    aria-label="表示中の体験者を全選択"
                    checked={allVisibleSelected}
                    ref={(el) => { if (el) el.indeterminate = !allVisibleSelected && someVisibleSelected; }}
                    onChange={(e) => toggleAllVisibleTrials(e.target.checked)}
                  />
                </th><th>受講日</th><th>店舗</th><th>メンバーID</th><th>氏名</th><th>担当者</th><th>入会月</th><th></th></tr></thead>
                <tbody>
                  {visibleTrials.map((t) => (
                    <tr key={t.id}>
                      <td>
                        <input
                          type="checkbox"
                          aria-label={`${t.name || t.memberId || "体験者"}を選択`}
                          checked={selectedTrialIds.includes(t.id)}
                          onChange={(e) => toggleTrialSelection(t.id, e.target.checked)}
                        />
                      </td>
                      <td>{t.lessonDate || "—"}</td>
                      <td style={{ textAlign: "left" }}>{t.store || "—"}</td>
                      <td>{t.memberId || "—"}</td>
                      <td style={{ textAlign: "left" }}>{t.name || "—"}</td>
                      <td>
                        <select className="f4h-input" style={{ padding: "4px 6px", fontSize: 12, minWidth: 92,
                          color: t.staff === EXCLUDED_STAFF ? "var(--red)" : undefined, fontWeight: t.staff === EXCLUDED_STAFF ? 700 : undefined }}
                          value={t.staff || ""} onChange={(e) => setStaffFor(t.id, e.target.value)}>
                          <option value="">未設定</option>
                          {data.staff.map((s) => <option key={s.name} value={s.name}>{s.name}</option>)}
                          <option value={EXCLUDED_STAFF}>── 入会意思なし（除外） ──</option>
                        </select>
                      </td>
                      <td>
                        {(() => {
                          const auto = effectiveJoinMonthAuto(t, joinsMap);
                          const isManual = !!t.manualJoinMonth && t.manualJoinMonth !== NOSHOW_MARKER;
                          const isNoshow = t.manualJoinMonth === NOSHOW_MARKER;
                          const isNotJoined = !isManual && !isNoshow && !auto;
                          return (
                            <select className="f4h-input" style={{ padding: "4px 6px", fontSize: 12, minWidth: 92,
                              color: isManual ? "var(--blue)" : (isNotJoined || isNoshow) ? "var(--red)" : undefined,
                              fontWeight: (isManual || isNotJoined || isNoshow) ? 700 : undefined }}
                              value={t.manualJoinMonth || ""} onChange={(e) => setJoinMonthFor(t.id, e.target.value)}>
                              <option value="">{auto ? `${auto}月（入会者データと一致）` : "未入会"}</option>
                              {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                                <option key={m} value={m}>{m}月（手動）</option>
                              ))}
                              <option value={NOSHOW_MARKER}>── 来店無し（除外） ──</option>
                            </select>
                          );
                        })()}
                      </td>
                      <td><button className="f4h-btn f4h-btn-ghost f4h-focus" style={{ padding: 4 }} onClick={() => setDelTarget(t.id)} aria-label="削除"><Trash2 size={14} /></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {visibleCount < filteredTrials.length && (
              <div style={{ textAlign: "center", marginTop: 10 }}>
                <button className="f4h-btn f4h-btn-outline f4h-focus" style={{ padding: "6px 14px" }} onClick={() => setVisibleCount((v) => v + 60)}>
                  もっと見る（残り{filteredTrials.length - visibleCount}件）
                </button>
              </div>
            )}
          </>
        )}
      </div>
      <ConfirmDialog open={!!delTarget} title="この体験記録を削除しますか？" message="この操作は元に戻せません。CSVの再取込でも復元されません。"
        onCancel={() => setDelTarget(null)} onConfirm={() => deleteTrial(delTarget)} />
    </div>
  );
}

// ============================================================
// データ入力：入会者データ取込
// ============================================================
function JoinImportPanel({ data, updateData, showToast }) {
  const [csvText, setCsvText] = useState("");
  const [rawRows, setRawRows] = useState(null);
  const [headers, setHeaders] = useState([]);
  const [mapping, setMapping] = useState(null);
  const [delTarget, setDelTarget] = useState(null);
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(40);
  const [importSourceName, setImportSourceName] = useState("貼り付けCSV");
  const [counselingSyncWarning, setCounselingSyncWarning] = useState("");
  const fileRef = useRef(null);

  const doParse = useCallback((text) => {
    const clean = text.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
    Papa.parse(clean, {
      header: true, skipEmptyLines: true,
      complete: (res) => {
        const hdrs = res.meta.fields || [];
        setHeaders(hdrs);
        setRawRows(res.data);
        setMapping(suggestMapping(hdrs, REQUIRED_JOIN_FIELDS));
      },
      error: () => showToast("CSVの解析に失敗しました。", true),
    });
  }, [showToast]);

  const onFile = useCallback((e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target.result;
      setCsvText(text);
      setImportSourceName(f.name || "入会者データCSV");
      setCounselingSyncWarning("");
      doParse(text);
    };
    reader.onerror = () => showToast("ファイルの読み込みに失敗しました。", true);
    reader.readAsText(f, "UTF-8");
  }, [doParse, showToast]);

  const onParseText = useCallback(() => {
    if (csvText.trim()) {
      setImportSourceName("貼り付けCSV");
      setCounselingSyncWarning("");
      doParse(csvText);
    }
  }, [csvText, doParse]);
  const setMap = (key, val) => setMapping((m) => ({ ...m, [key]: val }));

  const cleaned = useMemo(() => {
    if (!rawRows || !mapping) return [];
    return cleanJoinCsvRows(rawRows, mapping);
  }, [rawRows, mapping]);
  const dedup = useMemo(() => dedupeJoins(cleaned, data.joins), [cleaned, data.joins]);
  const counselingImport = useMemo(() => {
    if (!rawRows) return null;
    return buildCounselingNewMembersFromJoinCsv(rawRows, importSourceName);
  }, [rawRows, importSourceName]);
  const mappingValid = mapping && mapping.memberId && mapping.effectiveDate;
  const counselingImportableCount = counselingImport?.rows?.length || 0;

  const handleImport = async () => {
    if (!dedup.accepted.length && !counselingImportableCount) {
      showToast("取り込める新規データがありません。", true);
      return;
    }
    if (dedup.accepted.length) {
      await updateData("joins", (cur) => [...cur, ...dedup.accepted]);
    }
    let counselingFailed = false;
    let counselingWarning = "";
    try {
      if (counselingImportableCount) {
        await updateData("counselingNewMembers", (cur) => (
          mergeCounselingMemberMonthImport(
            cur,
            counselingImport.rows,
            counselingImport.stats,
            counselingImport.filename,
            counselingNewMemberMonthOf
          )
        ));
        counselingWarning = counselingImport.warnings?.join(" ") || "";
      } else {
        counselingFailed = true;
        counselingWarning = "カウンセリング分析用新規入会者データの保存対象が見つかりませんでした。";
      }
    } catch (error) {
      counselingFailed = true;
      counselingWarning = "カウンセリング分析用新規入会者データの反映に失敗しました。";
      console.warn("[join import] counseling new members sync failed", error);
    }
    if (counselingWarning) {
      console.warn("[join import] counseling new members sync warning", counselingWarning);
      setCounselingSyncWarning(counselingWarning);
    } else {
      setCounselingSyncWarning("");
    }
    if (counselingFailed) {
      showToast("入会者データは保存されましたが、カウンセリング分析用新規入会者データの反映に一部失敗しました。", true);
    } else {
      showToast(`CVR用 ${dedup.accepted.length}件 / カウンセリング分析用 ${counselingImportableCount}件を反映しました（重複・不正スキップ${dedup.skipped}件）`);
    }
    setCsvText(""); setRawRows(null); setHeaders([]); setMapping(null); setImportSourceName("貼り付けCSV");
    if (fileRef.current) fileRef.current.value = "";
  };

  const deleteJoin = async (memberId) => {
    await updateData("joins", (cur) => cur.filter((j) => j.memberId !== memberId));
    setDelTarget(null);
    showToast("削除しました");
  };

  const filteredJoins = useMemo(() => {
    let rows = [...data.joins].sort((a, b) => b.year - a.year || b.month - a.month);
    if (search.trim()) rows = rows.filter((j) => j.memberId.includes(search.trim()));
    return rows;
  }, [data.joins, search]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div className="f4h-card" style={{ padding: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <UserPlus size={16} /><div style={{ fontWeight: 700, fontSize: 14 }}>入会者データを取り込む</div>
        </div>
        <p style={{ fontSize: 12.5, color: "var(--ink-faint)", margin: "2px 0 14px" }}>
          hacomonoのメンバー一覧（新規契約）からエクスポートしたCSVをそのまま貼り付けるか、ファイルを選択してください。「プラン契約適用開始日」の年月をその会員の入会月として判定します（契約日や入会日時とは別の列です）。メンバーIDで体験データと自動照合され、CVR集計に反映されます。
        </p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 10 }}>
          <button className="f4h-btn f4h-btn-outline f4h-focus" style={{ padding: "8px 14px" }} onClick={() => fileRef.current?.click()}>
            <Upload size={14} /> CSVファイルを選択
          </button>
          <input ref={fileRef} type="file" accept=".csv,text/csv" style={{ display: "none" }} onChange={onFile} />
          <span style={{ fontSize: 12, color: "var(--ink-faint)", alignSelf: "center" }}>または下に貼り付け↓</span>
        </div>
        <textarea className="f4h-input" rows={4} placeholder="CSVの内容をここに貼り付け…"
          style={{ resize: "vertical", fontFamily: "monospace", fontSize: 12 }} value={csvText} onChange={(e) => setCsvText(e.target.value)} />
        <div style={{ marginTop: 8, display: "flex", gap: 8, alignItems: "center" }}>
          <button className="f4h-btn f4h-btn-primary f4h-focus" style={{ padding: "8px 16px" }} onClick={onParseText} disabled={!csvText.trim()}>読み込む</button>
          <button className="f4h-btn f4h-btn-outline f4h-focus" style={{ padding: "8px 14px" }}
            disabled={!csvText && !rawRows}
            onClick={() => { setCsvText(""); setRawRows(null); setHeaders([]); setMapping(null); setImportSourceName("貼り付けCSV"); setCounselingSyncWarning(""); if (fileRef.current) fileRef.current.value = ""; }}>
            <X size={13} /> リセット
          </button>
        </div>
        {counselingSyncWarning && (
          <div style={{ display: "flex", gap: 6, alignItems: "center", color: "var(--red)", fontSize: 12.5, marginTop: 10 }}>
            <AlertTriangle size={14} /> {counselingSyncWarning}
          </div>
        )}

        {rawRows && (
          <div className="f4h-fade-in" style={{ marginTop: 18, borderTop: "1px solid var(--border-soft)", paddingTop: 16 }}>
            <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10 }}>列の対応づけ（{rawRows.length}行を検出）</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px,1fr))", gap: 10, marginBottom: 14 }}>
              {REQUIRED_JOIN_FIELDS.map((f) => (
                <MappingRow key={f.key} field={f} headers={headers} value={mapping[f.key] || ""} onChange={setMap} />
              ))}
            </div>
            {!mappingValid && (
              <div style={{ display: "flex", gap: 6, alignItems: "center", color: "var(--red)", fontSize: 12.5, marginBottom: 10 }}>
                <AlertTriangle size={14} /> メンバーID・プラン契約適用開始日は必須項目です
              </div>
            )}
            {mappingValid && (
              <>
                <div style={{ display: "flex", gap: 14, fontSize: 12.5, color: "var(--ink-soft)", marginBottom: 8, flexWrap: "wrap" }}>
                  <span>検出 <b className="num">{cleaned.length}</b>件</span>
                  <span>新規取込 <b className="num" style={{ color: "var(--go)" }}>{dedup.accepted.length}</b>件</span>
                  <span>重複/日付不明スキップ <b className="num" style={{ color: "var(--ink-faint)" }}>{dedup.skipped}</b>件</span>
                  <span>カウンセリング分析用 <b className="num" style={{ color: "var(--blue)" }}>{counselingImportableCount}</b>件</span>
                </div>
                <div className="scrollbar-thin" style={{ maxHeight: 220, overflow: "auto", border: "1px solid var(--border-soft)", borderRadius: 8, marginBottom: 12 }}>
                  <table className="f4h-table">
                    <thead><tr><th>メンバーID</th><th>入会年月</th><th>状態</th></tr></thead>
                    <tbody>
                      {dedup.accepted.slice(0, 50).map((r, i) => (
                        <tr key={i}>
                          <td>{r.memberId}</td><td>{r.year}年{r.month}月</td>
                          <td><span className="f4h-tone-go" style={{ borderRadius: 999, padding: "1px 8px", fontSize: 11, fontWeight: 700 }}>新規</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button className="f4h-btn f4h-btn-primary f4h-focus" style={{ padding: "9px 18px" }} onClick={handleImport} disabled={!dedup.accepted.length && !counselingImportableCount}>
                  <Check size={15} /> 取り込む
                </button>
              </>
            )}
          </div>
        )}
      </div>

      <div className="f4h-card" style={{ padding: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10, marginBottom: 12 }}>
          <div style={{ fontWeight: 700, fontSize: 14 }}>入会者データ一覧（{data.joins.length}件）</div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", fontSize: 12.5, color: "var(--ink-soft)" }}>
            <CounselingStatLine label="CVR用入会者データ" value={`${data.joins.length}件`} />
            <CounselingStatLine label="カウンセリング分析用新規入会者データ" value={`${normalizeCounselingNewMembers(data.counselingNewMembers).length}件`} />
          </div>
          <input className="f4h-input" style={{ width: 150 }} placeholder="メンバーIDで検索" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        {filteredJoins.length === 0 ? <EmptyState icon={UserPlus} title="入会データがありません" /> : (
          <>
            <div className="scrollbar-thin" style={{ overflow: "auto" }}>
              <table className="f4h-table">
                <thead><tr><th>年度</th><th>入会月</th><th>メンバーID</th><th></th></tr></thead>
                <tbody>
                  {filteredJoins.slice(0, visibleCount).map((j) => (
                    <tr key={j.memberId}>
                      <td>{j.year}</td><td>{j.month ? `${j.month}月` : "—"}</td><td>{j.memberId}</td>
                      <td><button className="f4h-btn f4h-btn-ghost f4h-focus" style={{ padding: 4 }} onClick={() => setDelTarget(j.memberId)}><Trash2 size={14} /></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {visibleCount < filteredJoins.length && (
              <div style={{ textAlign: "center", marginTop: 10 }}>
                <button className="f4h-btn f4h-btn-outline f4h-focus" style={{ padding: "6px 14px" }} onClick={() => setVisibleCount((v) => v + 60)}>もっと見る</button>
              </div>
            )}
          </>
        )}
      </div>
      <ConfirmDialog open={!!delTarget} title="この入会データを削除しますか？" message="体験データとの照合（CVR算出）から除外されます。"
        onCancel={() => setDelTarget(null)} onConfirm={() => deleteJoin(delTarget)} />
    </div>
  );
}

// ============================================================
// データ入力：月次実績（会員数・休退会・売上）
// ============================================================
function CancellationImportPanel({ data, updateData, showToast }) {
  const [csvText, setCsvText] = useState("");
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState("");
  const fileRef = useRef(null);
  const current = normalizeCancellations(data.cancellations || { rows: [], imports: {}, importedAt: null, source: null });
  const currentMonthCounts = monthlyCancellationCounts(current.rows);
  const counselingCancelMembers = normalizeCounselingCancelMembers(data.counselingCancelMembers);
  const counselingCancelMembersMeta = normalizeCounselingCancelMembersMeta(data.counselingCancelMembers);

  const reset = () => {
    setCsvText("");
    setPreview(null);
    setFileName("");
    if (fileRef.current) fileRef.current.value = "";
  };

  const doParse = useCallback((text, name = "") => {
    const clean = text.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
    Papa.parse(clean, {
      header: true,
      skipEmptyLines: true,
      complete: (res) => {
        const rawRows = res.data || [];
        const parsed = parseCancellationRows(rawRows);
        const counselingParsed = parseCounselingCancelMembers(rawRows, data.counselingNewMembers);
        setPreview({
          rows: parsed.rows,
          skipped: parsed.skipped,
          rawMonthCounts: parsed.rawMonthCounts,
          validMonthCounts: parsed.validMonthCounts,
          counselingRows: counselingParsed.rows,
          counselingStats: counselingParsed.stats,
          source: {
            filename: name || "貼り付けCSV",
            rowCount: rawRows.length,
            validCount: parsed.rows.length,
          },
        });
      },
      error: () => showToast("CSVの解析に失敗しました。", true),
    });
  }, [data.counselingNewMembers, showToast]);

  const onFile = useCallback((e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFileName(f.name);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target.result;
      setCsvText(text);
      doParse(text, f.name);
    };
    reader.onerror = () => showToast("ファイルの読み込みに失敗しました。", true);
    reader.readAsText(f, "UTF-8");
  }, [doParse, showToast]);

  const onParseText = useCallback(() => {
    if (csvText.trim()) doParse(csvText, fileName);
  }, [csvText, doParse, fileName]);

  const handleImport = async () => {
    if (!preview || !preview.rows.length) {
      showToast("取り込める退会者明細がありません。", true);
      return;
    }
    const payloadInput = {
      rows: preview.rows,
      rawMonthCounts: preview.rawMonthCounts,
      validMonthCounts: preview.validMonthCounts,
    };
    const counselingRows = preview.counselingRows || [];
    if (!counselingRows.length) {
      showToast("カウンセリング分析用の退会者データを作成できませんでした。CSVのメンバーIDとプラン契約適用終了日を確認してください。", true);
      return;
    }
    await updateData("cancellations", (cur) => mergeCancellationImport(cur, payloadInput, preview.source));
    await updateData("counselingCancelMembers", (cur) => (
      mergeCounselingMemberMonthImport(
        cur,
        counselingRows,
        preview.counselingStats,
        preview.source?.filename,
        counselingCancelMemberMonthOf
      )
    ));
    showToast(`退会者データ ${preview.rows.length}件を保存し、カウンセリング分析用退会者データ ${counselingRows.length}件も更新しました`);
    reset();
  };
  const handleDeleteMonth = async (ym, count) => {
    if (!window.confirm(`${cancellationMonthLabel(ym)}の退会者データ${count}件を削除します。よろしいですか？`)) return;
    await updateData("cancellations", (cur) => deleteCancellationMonth(cur, ym));
    showToast(`${cancellationMonthLabel(ym)}の退会者データを削除しました`);
  };
  const handleDeleteAll = async () => {
    if (!window.confirm("保存済み退会者データをすべて削除します。よろしいですか？この操作は元に戻せません。")) return;
    await updateData("cancellations", (cur) => deleteAllCancellations(cur));
    showToast("保存済み退会者データをすべて削除しました");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div className="f4h-card" style={{ padding: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <Upload size={16} /><div style={{ fontWeight: 700, fontSize: 14 }}>退会者CSVを取り込む</div>
        </div>
        <p style={{ fontSize: 12.5, color: "var(--ink-faint)", margin: "2px 0 14px", lineHeight: 1.7 }}>
          hacomonoから出力した退会者CSVを取り込み、分析用の退会明細として保存します。既存の月次実績・退会数には反映しません。CSVに含まれる退会月だけを置き換えるため、過去月を残したまま同じ月の再取込でも重複保存されません。
        </p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 10 }}>
          <button className="f4h-btn f4h-btn-outline f4h-focus" style={{ padding: "8px 14px" }} onClick={() => fileRef.current?.click()}>
            <Upload size={14} /> CSVファイルを選択
          </button>
          <input ref={fileRef} type="file" accept=".csv,text/csv" style={{ display: "none" }} onChange={onFile} />
          <span style={{ fontSize: 12, color: "var(--ink-faint)", alignSelf: "center" }}>または下に貼り付け</span>
        </div>
        <textarea className="f4h-input" rows={4} placeholder="CSVの内容をここに貼り付け…"
          style={{ resize: "vertical", fontFamily: "monospace", fontSize: 12 }}
          value={csvText} onChange={(e) => setCsvText(e.target.value)} />
        <div style={{ marginTop: 8, display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          <button className="f4h-btn f4h-btn-primary f4h-focus" style={{ padding: "8px 16px" }} onClick={onParseText} disabled={!csvText.trim()}>
            読み込む
          </button>
          <button className="f4h-btn f4h-btn-outline f4h-focus" style={{ padding: "8px 14px" }} disabled={!csvText && !preview} onClick={reset}>
            <X size={13} /> リセット
          </button>
        </div>

        {preview && (
          <div className="f4h-fade-in" style={{ marginTop: 18, borderTop: "1px solid var(--border-soft)", paddingTop: 16 }}>
            <div style={{ display: "flex", gap: 14, fontSize: 12.5, color: "var(--ink-soft)", marginBottom: 8, flexWrap: "wrap" }}>
              <span>総行数 <b className="num">{preview.source.rowCount}</b>件</span>
              <span>有効件数 <b className="num" style={{ color: "var(--go)" }}>{preview.source.validCount}</b>件</span>
              <span>カウンセリング反映 <b className="num" style={{ color: "var(--go)" }}>{preview.counselingRows?.length || 0}</b>件</span>
              <span>スキップ <b className="num" style={{ color: "var(--ink-faint)" }}>{preview.skipped}</b>件</span>
              <span>ファイル <b>{preview.source.filename}</b></span>
            </div>
            {preview.rows.length === 0 ? (
              <div style={{ display: "flex", gap: 6, alignItems: "center", color: "var(--red)", fontSize: 12.5, marginBottom: 10 }}>
                <AlertTriangle size={14} /> メンバーIDとプラン契約適用終了日を含む有効な退会者行が見つかりません。
              </div>
            ) : (
              <>
                <div className="scrollbar-thin" style={{ maxHeight: 220, overflow: "auto", border: "1px solid var(--border-soft)", borderRadius: 8, marginBottom: 12 }}>
                  <table className="f4h-table">
                    <thead><tr><th>退会月</th><th>店舗</th><th>メンバーID</th><th>氏名</th><th>プラン</th><th>退会手続き日</th><th>在籍</th></tr></thead>
                    <tbody>
                      {preview.rows.slice(0, 50).map((r) => (
                        <tr key={`${r.memberId}-${r.planEndDate}`}>
                          <td>{r.cancellationMonth || "—"}</td>
                          <td style={{ textAlign: "left" }}>{r.store || "—"}</td>
                          <td>{r.memberId}</td>
                          <td style={{ textAlign: "left" }}>{r.name || "—"}</td>
                          <td style={{ textAlign: "left" }}>{r.planName || "—"}</td>
                          <td>{r.cancellationRequestDate || "—"}</td>
                          <td>{r.tenureMonths != null ? `${r.tenureMonths}ヶ月` : "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button className="f4h-btn f4h-btn-primary f4h-focus" style={{ padding: "9px 18px" }} onClick={handleImport}>
                  <Check size={15} /> 退会者明細 {preview.rows.length}件を保存する
                </button>
              </>
            )}
          </div>
        )}
      </div>

      <div className="f4h-card" style={{ padding: 18 }}>
        <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 10 }}>保存済み退会者明細</div>
        <div style={{ display: "flex", gap: 18, flexWrap: "wrap", fontSize: 12.5, color: "var(--ink-soft)" }}>
          <span>退会者明細 <b className="num">{current.rows?.length || 0}</b>件</span>
          <span>カウンセリング分析用退会者データ <b className="num">{counselingCancelMembers.length}</b>件</span>
          <span>最終取込日時 <b>{current.importedAt ? new Date(current.importedAt).toLocaleString("ja-JP") : "—"}</b></span>
          <span>元ファイル名 <b>{current.source?.filename || "—"}</b></span>
          <span>有効件数 / 総行数 <b className="num">{current.source?.validCount ?? 0}</b> / <b className="num">{current.source?.rowCount ?? 0}</b></span>
          <span>カウンセリング側最終取込 <b>{(counselingCancelMembersMeta.importedAt || counselingCancelMembersMeta.lastImportedAt) ? new Date(counselingCancelMembersMeta.importedAt || counselingCancelMembersMeta.lastImportedAt).toLocaleString("ja-JP") : "—"}</b></span>
        </div>
        <div style={{ marginTop: 12, display: "grid", gap: 6 }}>
          <div style={{ fontSize: 12, color: "var(--ink-soft)", fontWeight: 700 }}>登録済み月</div>
          {currentMonthCounts.length === 0 ? (
            <div style={{ fontSize: 12, color: "var(--ink-faint)" }}>—</div>
          ) : (
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {currentMonthCounts.map((item) => {
                const imported = current.imports?.[item.ym];
                return (
                  <span key={item.ym} style={{ display: "inline-flex", gap: 5, alignItems: "center", padding: "5px 9px", border: "1px solid var(--border-soft)", borderRadius: 999, background: "var(--surface-soft)", fontSize: 12, color: "var(--ink-soft)" }} title={imported?.filename || ""}>
                    <b>{cancellationMonthLabel(item.ym)}</b>
                    <span className="num">{item.count}</span>件
                    <button type="button" className="f4h-btn f4h-btn-ghost f4h-focus" style={{ padding: 2, minHeight: 0, color: "var(--red)" }} title={`${cancellationMonthLabel(item.ym)}を削除`} onClick={() => handleDeleteMonth(item.ym, item.count)}>
                      <Trash2 size={13} />
                    </button>
                  </span>
                );
              })}
            </div>
          )}
        </div>
        {current.rows?.length > 0 && (
          <div style={{ marginTop: 12 }}>
            <button type="button" className="f4h-btn f4h-btn-outline f4h-focus" style={{ padding: "7px 12px", color: "var(--red)" }} onClick={handleDeleteAll}>
              <Trash2 size={14} /> 退会者データをすべて削除
            </button>
          </div>
        )}
        <div style={{ marginTop: 10, fontSize: 11.5, color: "var(--ink-faint)", lineHeight: 1.7 }}>
          退会手続き日がないデータも保存します。将来の週別サマリー・退会前未回来期間分析では、退会手続き日がある明細のみを対象にします。
        </div>
      </div>
    </div>
  );
}

function NumField({ label, value, onChange, suffix }) {
  return (
    <div>
      <label style={{ fontSize: 11.5, color: "var(--ink-faint)", fontWeight: 700, display: "block", marginBottom: 4 }}>{label}</label>
      <div style={{ position: "relative" }}>
        <input
          type="number"
          className="f4h-input num"
          value={value}
          onChange={(e) => onChange(e.target.value === "" ? "" : Number(e.target.value))}
          style={{ paddingRight: 44 }}
        />
        {suffix && (
          <span style={{ position: "absolute", right: 26, top: "50%", transform: "translateY(-50%)", fontSize: 11, color: "var(--ink-faint)", pointerEvents: "none" }}>
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

function CancellationSurveyImportPanel({ data, updateData, showToast }) {
  const [csvText, setCsvText] = useState("");
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState("");
  const fileRef = useRef(null);
  const current = normalizeCancellationSurvey(data.cancellationSurvey);
  const monthCounts = current.meta?.registeredMonths?.length ? current.meta.registeredMonths : monthlyCancellationSurveyCounts(current.rows);

  const reset = () => {
    setCsvText("");
    setPreview(null);
    setFileName("");
    if (fileRef.current) fileRef.current.value = "";
  };
  const doParse = useCallback((text, name = "") => {
    const clean = String(text || "").replace(/^\uFEFF/, "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
    Papa.parse(clean, {
      header: true,
      skipEmptyLines: true,
      complete: (res) => {
        const rawRows = res.data || [];
        setPreview(parseCancellationSurveyRows(rawRows, name || fileName || "貼り付け入力"));
      },
      error: () => showToast("CSVの解析に失敗しました。", true),
    });
  }, [fileName, showToast]);
  const onFile = useCallback((e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFileName(f.name);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target.result || "";
      setCsvText(text);
      doParse(text, f.name);
    };
    reader.onerror = () => showToast("ファイルの読み込みに失敗しました。", true);
    reader.readAsText(f, "UTF-8");
  }, [doParse, showToast]);
  const onParseText = useCallback(() => {
    if (csvText.trim()) doParse(csvText, fileName || "貼り付け入力");
  }, [csvText, doParse, fileName]);
  const handleImport = async () => {
    if (!preview || !preview.rows.length) {
      showToast("保存対象の退会者アンケートデータがありません。", true);
      return;
    }
    await updateData("cancellationSurvey", () => replaceCancellationSurveyImport(preview));
    showToast(`退会者アンケート ${preview.rows.length}件を保存しました`);
    reset();
  };
  const handleDeleteAll = async () => {
    if (!window.confirm("保存済み退会者アンケートデータをすべて削除します。よろしいですか？この操作は元に戻せません。")) return;
    await updateData("cancellationSurvey", () => emptyCancellationSurvey());
    showToast("保存済み退会者アンケートデータをすべて削除しました");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div className="f4h-card" style={{ padding: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <Upload size={16} /><div style={{ fontWeight: 700, fontSize: 14 }}>退会者アンケートCSVを取り込む</div>
        </div>
        <p style={{ fontSize: 12.5, color: "var(--ink-faint)", margin: "2px 0 14px", lineHeight: 1.7 }}>
          hacomonoから出力した退会者アンケートCSVを取り込み、退会理由分析に反映します。複数回答の項目は回答ありの件数として集計します。
        </p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 10 }}>
          <button type="button" className="f4h-btn f4h-btn-outline f4h-focus" style={{ padding: "8px 14px" }} onClick={() => fileRef.current?.click()}>
            <Upload size={14} /> CSVファイルを選択
          </button>
          <input ref={fileRef} type="file" accept=".csv,text/csv" style={{ display: "none" }} onChange={onFile} />
          <span style={{ fontSize: 12, color: "var(--ink-faint)", alignSelf: "center" }}>または下に貼り付け</span>
        </div>
        <textarea className="f4h-input" rows={4} placeholder="退会者アンケートCSVの内容をここに貼り付け..."
          style={{ resize: "vertical", fontFamily: "monospace", fontSize: 12 }}
          value={csvText} onChange={(e) => {
            setCsvText(e.target.value);
            setFileName("貼り付け入力");
            setPreview(null);
          }} />
        <div style={{ marginTop: 8, display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          <button className="f4h-btn f4h-btn-primary f4h-focus" style={{ padding: "8px 16px" }} onClick={onParseText} disabled={!csvText.trim()}>
            読み込む
          </button>
          <button className="f4h-btn f4h-btn-outline f4h-focus" style={{ padding: "8px 14px" }} disabled={!csvText && !preview} onClick={reset}>
            <X size={13} /> リセット
          </button>
        </div>

        {preview && (
          <div className="f4h-fade-in" style={{ marginTop: 18, borderTop: "1px solid var(--border-soft)", paddingTop: 16 }}>
            <div style={{ display: "flex", gap: 14, fontSize: 12.5, color: "var(--ink-soft)", marginBottom: 8, flexWrap: "wrap" }}>
              <CounselingStatLine label="CSV行数" value={`${preview.meta.rowCount}件`} />
              <CounselingStatLine label="保存対象" value={`${preview.rows.length}件`} />
              <CounselingStatLine label="スキップ" value={`${preview.skipped}件`} />
              <span>ファイル <b>{preview.meta.lastFileName}</b></span>
            </div>
            {preview.rows.length === 0 ? (
              <div style={{ display: "flex", gap: 6, alignItems: "center", color: "var(--red)", fontSize: 12.5, marginBottom: 10 }}>
                <AlertTriangle size={14} /> 保存対象の退会者アンケートデータが見つかりません。
              </div>
            ) : (
              <>
                <div className="scrollbar-thin" style={{ maxHeight: 220, overflow: "auto", border: "1px solid var(--border-soft)", borderRadius: 8, marginBottom: 12 }}>
                  <table className="f4h-table">
                    <thead><tr><th>登録日時</th><th>店舗</th><th>メンバーID</th><th>氏名</th><th>年齢</th><th>環境要因</th><th>サービス要因</th><th>再案内</th></tr></thead>
                    <tbody>
                      {preview.rows.slice(0, 50).map((r, index) => (
                        <tr key={`${r.memberId}-${r.registeredAt}-${index}`}>
                          <td>{r.registeredAt || "—"}</td>
                          <td>{r.store || "不明"}</td>
                          <td>{r.memberId || "—"}</td>
                          <td style={{ textAlign: "left" }}>{r.memberName || "—"}</td>
                          <td className="num">{r.age || "—"}</td>
                          <td className="num">{r.environmentReasons.length}件</td>
                          <td className="num">{r.serviceReasons.length}件</td>
                          <td>{cancellationSurveyMailAllowed(r.mailPermission) ? "許可" : "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button className="f4h-btn f4h-btn-primary f4h-focus" style={{ padding: "9px 18px" }} onClick={handleImport}>
                  <Check size={15} /> 退会者アンケート {preview.rows.length}件を保存する
                </button>
              </>
            )}
          </div>
        )}
      </div>

      <div className="f4h-card" style={{ padding: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center", flexWrap: "wrap", marginBottom: 10 }}>
          <div style={{ fontWeight: 700, fontSize: 14 }}>保存済み退会者アンケート</div>
          {current.rows.length > 0 && (
            <button type="button" className="f4h-btn f4h-btn-ghost f4h-focus" style={{ padding: "7px 12px", color: "var(--red)" }} onClick={handleDeleteAll}>
              <Trash2 size={14} /> 退会者アンケートデータをすべて削除
            </button>
          )}
        </div>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", fontSize: 12.5, color: "var(--ink-soft)", marginBottom: 10 }}>
          <CounselingStatLine label="保存済み退会者アンケート 合計" value={`${current.rows.length}件`} />
          <CounselingStatLine label="最終取込日時" value={current.meta?.lastImportedAt ? new Date(current.meta.lastImportedAt).toLocaleString("ja-JP") : "—"} />
          <CounselingStatLine label="直近取込ファイル名" value={current.meta?.lastFileName || "—"} />
        </div>
        <div style={{ fontSize: 12.5, color: "var(--ink-soft)" }}>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>登録済み月</div>
          {monthCounts.length ? (
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {monthCounts.map(({ ym, count }) => (
                <span key={ym} style={{ border: "1px solid var(--border-soft)", borderRadius: 999, padding: "4px 9px", background: "var(--surface)" }}>
                  {cancellationMonthLabel(ym)} {count}件
                </span>
              ))}
            </div>
          ) : (
            <span style={{ color: "var(--ink-faint)" }}>登録済み月はありません。</span>
          )}
        </div>
      </div>
    </div>
  );
}

function MonthlyActualsPanel({ data, updateData, showToast }) {
  const today = useMemo(() => todayParts(), []);
  const [store, setStore] = useState(STORE_DEFS[0].key);
  const [year, setYear] = useState(today.year);
  const [month, setMonth] = useState(today.month);
  const existing = getMemberMonthly(data.memberMonthly, store, year, month);
  const existingRevenue = getRevenueActual(data.revenueActuals, store, year, month);

  const [form, setForm] = useState({ total: "", onHold: "", joinsTotal: "", leaves: "", revenue: "" });
  useEffect(() => {
    setForm({
      total: existing?.total ?? "", onHold: existing?.onHold ?? "",
      joinsTotal: existing?.joinsTotal ?? "", leaves: existing?.leaves ?? "",
      revenue: existingRevenue ?? "",
    });
    // eslint-disable-next-line
  }, [store, year, month]);

  const priorTotal = getPriorMonthTotal(data.memberMonthly, data.baselines, store, year, month);
  const liveActive = form.total !== "" ? activeMembersOf(Number(form.total), Number(form.onHold) || 0) : null;
  const liveNet = form.joinsTotal !== "" && form.leaves !== "" ? netIncreaseOf(Number(form.joinsTotal), Number(form.leaves)) : null;
  const liveChurn = form.leaves !== "" ? churnRateOf(Number(form.leaves), priorTotal) : null;

  const set = (k) => (v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSave = async () => {
    if (form.total === "") { showToast("総会員数を入力してください。", true); return; }
    const rec = {
      store, year, month,
      total: Number(form.total), onHold: Number(form.onHold) || 0,
      joinsTotal: Number(form.joinsTotal) || 0, leaves: Number(form.leaves) || 0,
    };
    await updateData("memberMonthly", (cur) => {
      const idx = cur.findIndex((r) => r.store === store && r.year === year && r.month === month);
      if (idx === -1) return [...cur, rec];
      const next = [...cur]; next[idx] = rec; return next;
    });
    if (form.revenue !== "") {
      const amt = Number(form.revenue);
      await updateData("revenueActuals", (cur) => {
        const idx = cur.findIndex((r) => r.store === store && r.year === year && r.month === month);
        const rec2 = { store, year, month, amount: amt };
        if (idx === -1) return [...cur, rec2];
        const next = [...cur]; next[idx] = rec2; return next;
      });
    }
    showToast(`${store}・${year}年${month}月の実績を保存しました`);
  };

  const recentRows = useMemo(() => {
    return data.memberMonthly
      .filter((r) => r.store === store)
      .sort((a, b) => b.year - a.year || b.month - a.month)
      .slice(0, 8);
  }, [data.memberMonthly, store]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div className="f4h-card" style={{ padding: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <Calendar size={16} /><div style={{ fontWeight: 700, fontSize: 14 }}>月次実績の入力</div>
        </div>
        <p style={{ fontSize: 12.5, color: "var(--ink-faint)", margin: "2px 0 14px" }}>
          hacomonoのメンバー一覧（契約中／休会／新規契約／退会）から件数を数えて入力してください。アクティブ会員数・純増数・退会率は自動計算されます。
        </p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
          <div style={{ display: "flex", gap: 4 }}>
            {STORE_DEFS.map((s) => <Pill key={s.key} active={store === s.key} onClick={() => setStore(s.key)}>{s.key}</Pill>)}
          </div>
          <MonthPicker year={year} month={month} onChange={(y, m) => { setYear(y); setMonth(m); }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px,1fr))", gap: 12, marginBottom: 14 }}>
          <NumField label="総会員数" value={form.total} onChange={set("total")} suffix="人" />
          <NumField label="休会数" value={form.onHold} onChange={set("onHold")} suffix="人" />
          <NumField label="入会数（総合）" value={form.joinsTotal} onChange={set("joinsTotal")} suffix="人" />
          <NumField label="退会数" value={form.leaves} onChange={set("leaves")} suffix="人" />
          <NumField label="売上実績" value={form.revenue} onChange={set("revenue")} suffix="円" />
        </div>

        <div style={{ display: "flex", gap: 18, flexWrap: "wrap", padding: "10px 14px", background: "var(--surface-soft)", borderRadius: 10, marginBottom: 14, fontSize: 12.5 }}>
          <span>アクティブ会員数 <b className="num">{liveActive == null ? "—" : num(liveActive)}</b></span>
          <span>純増数 <b className="num">{liveNet == null ? "—" : signed(liveNet)}</b></span>
          <span>退会率 <b className="num">{liveChurn == null ? "—" : pct1(liveChurn)}</b>{priorTotal == null && <span style={{ color: "var(--amber)" }}>（前月実績が未入力のため概算不可）</span>}</span>
        </div>

        <p style={{ fontSize: 11.5, color: "var(--ink-faint)", marginBottom: 8 }}>
          入力後は、下部の保存ボタンを押してください
        </p>

        <button className="f4h-btn f4h-btn-primary f4h-focus" style={{ padding: "9px 18px" }} onClick={handleSave}>
          <Save size={15} /> 保存する
        </button>
      </div>

      <div className="f4h-card" style={{ padding: 18 }}>
        <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 10 }}>{store}・直近の入力履歴</div>
        {recentRows.length === 0 ? <EmptyState title="まだ入力がありません" /> : (
          <div className="scrollbar-thin" style={{ overflow: "auto" }}>
            <table className="f4h-table">
              <thead><tr><th>年月</th><th>総会員数</th><th>休会数</th><th>入会数</th><th>退会数</th><th>純増</th><th>退会率</th><th></th></tr></thead>
              <tbody>
                {recentRows.map((r) => {
                  const prior = getPriorMonthTotal(data.memberMonthly, data.baselines, store, r.year, r.month);
                  return (
                    <tr key={`${r.year}-${r.month}`} style={{ cursor: "pointer" }} onClick={() => { setYear(r.year); setMonth(r.month); }}>
                      <td>{r.year}年{r.month}月</td><td>{num(r.total)}</td><td>{num(r.onHold)}</td>
                      <td>{num(r.joinsTotal)}</td><td>{num(r.leaves)}</td>
                      <td><DeltaTag value={netIncreaseOf(r.joinsTotal, r.leaves)} /></td>
                      <td>{pct1(churnRateOf(r.leaves, prior))}</td>
                      <td><ChevronRight size={14} color="var(--ink-faint)" /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function DataEntryView({ data, updateData, showToast }) {
  const [tab, setTab] = useState("trial");
  return (
    <div className="f4h-fade-in" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <SectionHeading eyebrow="データ入力" title="hacomonoのデータを取り込む" />
      <SubTabs tabs={[
        { key: "trial", label: "体験者データ" },
        { key: "join", label: "入会者データ" },
        { key: "cancellation", label: "退会者CSV" },
        { key: "cancellationSurvey", label: "退会者アンケートCSV" },
        { key: "monthly", label: "月次実績・売上" },
        { key: "counseling", label: "カウンセリング分析用データ" },
      ]} active={tab} onChange={setTab} />
      {tab === "trial" && <TrialImportPanel data={data} updateData={updateData} showToast={showToast} />}
      {tab === "join" && <JoinImportPanel data={data} updateData={updateData} showToast={showToast} />}
      {tab === "cancellation" && <CancellationImportPanel data={data} updateData={updateData} showToast={showToast} />}
      {tab === "cancellationSurvey" && <CancellationSurveyImportPanel data={data} updateData={updateData} showToast={showToast} />}
      {tab === "monthly" && <MonthlyActualsPanel data={data} updateData={updateData} showToast={showToast} />}
      {tab === "counseling" && <CounselingDataImportSection data={data} updateData={updateData} showToast={showToast} />}
    </div>
  );
}

function CounselingStatLine({ label, value }) {
  return <span>{label} <b className="num">{value}</b></span>;
}

function CounselingReservationImportPanel({ data, updateData, showToast }) {
  const [csvText, setCsvText] = useState("");
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState("");
  const fileRef = useRef(null);
  const reservations = normalizeCounselingReservations(data.counselingReservations);
  const meta = normalizeCounselingMeta(data.counselingMeta);
  const monthCounts = monthlyCounselingCounts(reservations);
  const reservationStageCounts = counselingReservationStageCounts(reservations);
  const previewStageCounts = preview ? counselingReservationStageCounts(preview.rows) : null;

  const reset = () => {
    setCsvText("");
    setPreview(null);
    setFileName("");
    if (fileRef.current) fileRef.current.value = "";
  };

  const doParse = useCallback((text, name = "") => {
    const clean = text.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
    Papa.parse(clean, {
      header: true,
      skipEmptyLines: true,
      complete: (res) => {
        const rawRows = res.data || [];
        const parsed = parseCounselingRows(rawRows);
        const missingRequiredHeaders = missingCounselingReservationHeaders(res.meta?.fields || []);
        setPreview({
          rows: parsed.rows,
          stats: { ...parsed.stats, missingRequiredHeaders },
          filename: name || "貼り付けCSV",
        });
      },
      error: () => showToast("CSVの解析に失敗しました。", true),
    });
  }, [showToast]);

  const onFile = useCallback((e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFileName(f.name);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target.result;
      setCsvText(text);
      doParse(text, f.name);
    };
    reader.onerror = () => showToast("ファイルの読み込みに失敗しました。", true);
    reader.readAsText(f, "UTF-8");
  }, [doParse, showToast]);

  const onParseText = useCallback(() => {
    if (csvText.trim()) doParse(csvText, fileName);
  }, [csvText, doParse, fileName]);

  const handleImport = async () => {
    if (!preview) {
      showToast("CSVを読み込んでください。", true);
      return;
    }
    if (!preview.rows.length) {
      showToast("保存対象のカウンセリング予約がありません。", true);
      return;
    }
    const importedAt = new Date().toISOString();
    const source = {
      importedAt,
      filename: preview.filename,
      ...preview.stats,
    };
    await updateData("counselingReservations", (cur) => mergeCounselingReservations(cur, preview.rows));
    await updateData("counselingMeta", () => source);
    showToast(`カウンセリング予約 ${preview.rows.length}件を保存しました`);
    reset();
  };
  const handleDeleteMonth = async (ym, count) => {
    if (!window.confirm(`${counselingMonthLabel(ym)}の予約データ${count}件を削除します。よろしいですか？`)) return;
    const nextRows = deleteCounselingReservationMonth(reservations, ym);
    await updateData("counselingReservations", () => nextRows);
    if (nextRows.length === 0) await updateData("counselingMeta", () => emptyCounselingMeta());
    showToast(`${counselingMonthLabel(ym)}の予約データを削除しました`);
  };
  const handleDeleteAll = async () => {
    if (!window.confirm("保存済み予約データをすべて削除します。よろしいですか？この操作は元に戻せません。")) return;
    await updateData("counselingReservations", () => []);
    await updateData("counselingMeta", () => emptyCounselingMeta());
    showToast("保存済み予約データをすべて削除しました");
  };

  return (
    <div className="f4h-card" style={{ padding: 18 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
        <Upload size={16} /><div style={{ fontWeight: 700, fontSize: 14 }}>hacomono「予約一覧」CSVを取り込む</div>
      </div>
      <p style={{ fontSize: 12.5, color: "var(--ink-faint)", margin: "2px 0 14px", lineHeight: 1.7 }}>
        固定枠：予約一覧CSV、自由枠：予約一覧CSVのどちらにも対応しています。ファイル名ではなくCSVヘッダー名で必要項目を取得します。
      </p>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 10 }}>
        <button className="f4h-btn f4h-btn-outline f4h-focus" style={{ padding: "8px 14px" }} onClick={() => fileRef.current?.click()}>
          <Upload size={14} /> CSVファイルを選択
        </button>
        <input ref={fileRef} type="file" accept=".csv,text/csv" style={{ display: "none" }} onChange={onFile} />
        <span style={{ fontSize: 12, color: "var(--ink-faint)", alignSelf: "center" }}>または下に貼り付け</span>
      </div>
      <textarea className="f4h-input" rows={4} placeholder="CSVの内容をここに貼り付け..."
        style={{ resize: "vertical", fontFamily: "monospace", fontSize: 12 }}
        value={csvText} onChange={(e) => setCsvText(e.target.value)} />
      <div style={{ marginTop: 8, display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
        <button className="f4h-btn f4h-btn-primary f4h-focus" style={{ padding: "8px 16px" }} onClick={onParseText} disabled={!csvText.trim()}>
          読み込む
        </button>
        <button className="f4h-btn f4h-btn-outline f4h-focus" style={{ padding: "8px 14px" }} disabled={!csvText && !preview} onClick={reset}>
          <X size={13} /> リセット
        </button>
      </div>

      {preview && (
        <div className="f4h-fade-in" style={{ marginTop: 18, borderTop: "1px solid var(--border-soft)", paddingTop: 16 }}>
          <div style={{ display: "flex", gap: 14, fontSize: 12.5, color: "var(--ink-soft)", marginBottom: 8, flexWrap: "wrap" }}>
            <CounselingStatLine label="今回取込の総行数" value={`${preview.stats.rowCount}件`} />
            <CounselingStatLine label="有効件数" value={`${preview.stats.validCount}件`} />
            <CounselingStatLine label="対象外件数" value={`${preview.stats.excludedCount}件`} />
            <CounselingStatLine label="メンバーID空欄除外" value={`${preview.stats.blankMemberIdCount}件`} />
            <CounselingStatLine label="対象外チケット除外" value={`${preview.stats.ticketExcludedCount}件`} />
            <CounselingStatLine label="受講日不明除外" value={`${preview.stats.unknownDateCount}件`} />
            {previewStageCounts && <CounselingStatLine label="初回カウンセリング" value={`${previewStageCounts[1]}件`} />}
            {previewStageCounts && <CounselingStatLine label="2回目カウンセリング" value={`${previewStageCounts[2]}件`} />}
            {previewStageCounts && <CounselingStatLine label="3回目カウンセリング" value={`${previewStageCounts[3]}件`} />}
            {previewStageCounts && <CounselingStatLine label="4回目以降カウンセリング" value={`${previewStageCounts[4]}件`} />}
            <span>ファイル <b>{preview.filename}</b></span>
          </div>
          {preview.stats.missingRequiredHeaders?.length > 0 && (
            <div style={{ display: "flex", gap: 6, alignItems: "center", color: "var(--red)", fontSize: 12.5, marginBottom: 10 }}>
              <AlertTriangle size={14} /> 必須列が見つかりません: {preview.stats.missingRequiredHeaders.join(" / ")}
            </div>
          )}
          {preview.rows.length === 0 ? (
            <div style={{ display: "flex", gap: 6, alignItems: "center", color: "var(--red)", fontSize: 12.5, marginBottom: 10 }}>
              <AlertTriangle size={14} /> 保存対象のカウンセリング予約が見つかりません。
            </div>
          ) : (
            <>
              <div className="scrollbar-thin" style={{ maxHeight: 220, overflow: "auto", border: "1px solid var(--border-soft)", borderRadius: 8, marginBottom: 12 }}>
                <table className="f4h-table">
                  <thead><tr><th>受講日</th><th>店舗</th><th>使用チケット</th><th>メンバーID</th><th>氏名</th><th>開始</th><th>スタッフ</th></tr></thead>
                  <tbody>
                    {preview.rows.slice(0, 50).map((r) => (
                      <tr key={counselingReservationKey(r)}>
                        <td>{r.lessonDate || "—"}</td>
                        <td style={{ textAlign: "left" }}>{r.store || "—"}</td>
                        <td style={{ textAlign: "left" }}>{r.ticket || "—"}</td>
                        <td>{r.memberId}</td>
                        <td style={{ textAlign: "left" }}>{r.name || "—"}</td>
                        <td>{r.startTime || "—"}</td>
                        <td style={{ textAlign: "left" }}>{r.staffName || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button className="f4h-btn f4h-btn-primary f4h-focus" style={{ padding: "9px 18px" }} onClick={handleImport}>
                <Check size={15} /> カウンセリング予約 {preview.rows.length}件を保存する
              </button>
            </>
          )}
        </div>
      )}

      <div style={{ marginTop: 14, fontSize: 12.5, color: "var(--ink-soft)" }}>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <CounselingStatLine label="保存済み予約データ 合計" value={`${reservations.length}件`} />
          <CounselingStatLine label="初回カウンセリング" value={`${reservationStageCounts[1]}件`} />
          <CounselingStatLine label="2回目カウンセリング" value={`${reservationStageCounts[2]}件`} />
          <CounselingStatLine label="3回目カウンセリング" value={`${reservationStageCounts[3]}件`} />
          <CounselingStatLine label="4回目以降カウンセリング" value={`${reservationStageCounts[4]}件`} />
          <CounselingStatLine label="最終取込日時" value={meta.importedAt ? new Date(meta.importedAt).toLocaleString("ja-JP") : "—"} />
          <CounselingStatLine label="直近取込ファイル名" value={meta.filename || "—"} />
        </div>
        {monthCounts.length > 0 && (
          <div style={{ marginTop: 8, display: "flex", gap: 8, flexWrap: "wrap" }}>
            {monthCounts.map(({ ym, count }) => (
              <span key={ym} style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 8px", border: "1px solid var(--border-soft)", borderRadius: 999, background: "var(--surface-soft)" }}>
                {counselingMonthLabel(ym)} {count}件
                <button type="button" className="f4h-btn f4h-btn-ghost f4h-focus" style={{ padding: 2, minHeight: 0, color: "var(--red)" }} title={`${counselingMonthLabel(ym)}を削除`} onClick={() => handleDeleteMonth(ym, count)}>
                  <Trash2 size={13} />
                </button>
              </span>
            ))}
          </div>
        )}
        {reservations.length > 0 && (
          <div style={{ marginTop: 12 }}>
            <button type="button" className="f4h-btn f4h-btn-outline f4h-focus" style={{ padding: "7px 12px", color: "var(--red)" }} onClick={handleDeleteAll}>
              <Trash2 size={14} /> 予約データをすべて削除
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function CounselingDataImportSection({ data, updateData, showToast }) {
  const reservations = normalizeCounselingReservations(data.counselingReservations);
  const reservationMeta = normalizeCounselingMeta(data.counselingMeta);
  const activeMembers = normalizeCounselingActiveMembers(data.counselingActiveMembers);
  const activeMembersMeta = normalizeCounselingActiveMembersMeta(data.counselingActiveMembers);
  const newMembers = normalizeCounselingNewMembers(data.counselingNewMembers);
  const newMembersMeta = normalizeCounselingNewMembersMeta(data.counselingNewMembers);
  const cancelMembers = normalizeCounselingCancelMembers(data.counselingCancelMembers);
  const cancelMembersMeta = normalizeCounselingCancelMembersMeta(data.counselingCancelMembers);
  const cancelMemberMonthCounts = monthlyCounselingMemberCounts(cancelMembers, counselingCancelMemberMonthOf);
  const reservationStageCounts = counselingReservationStageCounts(reservations);
  const metaTime = (value) => value ? new Date(value).toLocaleString("ja-JP") : "—";
  const handleDeleteCancelMemberMonth = async (ym, count) => {
    if (!window.confirm(`${cancellationMonthLabel(ym)}のカウンセリング分析用退会者データ${count}件を削除します。よろしいですか？`)) return;
    await updateData("counselingCancelMembers", (cur) => deleteCounselingMemberMonth(
      cur,
      ym,
      counselingCancelMemberMonthOf,
      normalizeCounselingCancelMembers,
      normalizeCounselingCancelMembersMeta
    ));
    showToast(`${cancellationMonthLabel(ym)}のカウンセリング分析用退会者データを削除しました`);
  };
  const handleDeleteAllCancelMembers = async () => {
    if (!window.confirm("カウンセリング分析用退会者データをすべて削除します。よろしいですか？この操作は元に戻せません。")) return;
    await updateData("counselingCancelMembers", (cur) => deleteAllCounselingMembers(cur, normalizeCounselingCancelMembersMeta));
    showToast("カウンセリング分析用退会者データをすべて削除しました");
  };
  return (
    <div className="f4h-fade-in" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <SectionHeading eyebrow="カウンセリング分析用データ" title="カウンセリング分析用データ" />
      <p style={{ fontSize: 12.5, color: "var(--ink-faint)", margin: "-8px 0 0", lineHeight: 1.7 }}>
        カウンセリング分析で使用するCSVを取り込みます。取込後はカウンセリング分析タブに反映されます。
      </p>
      <div className="f4h-card" style={{ padding: 18 }}>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", fontSize: 12.5, color: "var(--ink-soft)" }}>
          <CounselingStatLine label="予約データ" value={`${reservations.length}件`} />
          <CounselingStatLine label="初回カウンセリング" value={`${reservationStageCounts[1]}件`} />
          <CounselingStatLine label="2回目カウンセリング" value={`${reservationStageCounts[2]}件`} />
          <CounselingStatLine label="3回目カウンセリング" value={`${reservationStageCounts[3]}件`} />
          <CounselingStatLine label="4回目以降カウンセリング" value={`${reservationStageCounts[4]}件`} />
          <CounselingStatLine label="在籍者データ" value={`${activeMembers.length}件`} />
          <CounselingStatLine label="新規入会者データ" value={`${newMembers.length}件`} />
          <CounselingStatLine label="退会者データ" value={`${cancelMembers.length}件`} />
        </div>
        <div style={{ marginTop: 8, display: "flex", gap: 14, flexWrap: "wrap", fontSize: 12, color: "var(--ink-faint)" }}>
          <span>予約 最終取込: {metaTime(reservationMeta.importedAt)}</span>
          <span>在籍者 最終取込: {metaTime(activeMembersMeta.importedAt)}</span>
          <span>新規入会者 最終取込: {metaTime(newMembersMeta.importedAt || newMembersMeta.lastImportedAt)}</span>
          <span>退会者 最終取込: {metaTime(cancelMembersMeta.importedAt || cancelMembersMeta.lastImportedAt)}</span>
        </div>
      </div>
      <CounselingReservationImportPanel data={data} updateData={updateData} showToast={showToast} />
      <ActiveMemberImportPanel data={data} updateData={updateData} showToast={showToast} />
      <NewMemberImportPanel data={data} updateData={updateData} showToast={showToast} />
      <div className="f4h-card" style={{ padding: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <Upload size={16} /><div style={{ fontWeight: 700, fontSize: 14 }}>メンバー一覧（退会）CSV</div>
        </div>
        <p style={{ fontSize: 12.5, color: "var(--ink-faint)", margin: "2px 0 12px", lineHeight: 1.7 }}>
          退会者CSVは「退会者CSV」タブから取り込むと、退会分析とカウンセリング分析の両方に反映されます。
        </p>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", fontSize: 12.5, color: "var(--ink-soft)" }}>
          <CounselingStatLine label="カウンセリング分析用退会者データ" value={`${cancelMembers.length}件`} />
          <CounselingStatLine label="最終取込日時" value={metaTime(cancelMembersMeta.importedAt || cancelMembersMeta.lastImportedAt)} />
          <CounselingStatLine label="直近取込ファイル名" value={cancelMembersMeta.filename || cancelMembersMeta.lastFileName || "—"} />
        </div>
        <div style={{ marginTop: 10 }}>
          <div style={{ fontWeight: 700, fontSize: 12, color: "var(--ink-faint)", marginBottom: 4 }}>登録済み退会月</div>
          {cancelMemberMonthCounts.length ? (
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {cancelMemberMonthCounts.map(({ ym, count }) => (
                <span key={ym} style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 8px", border: "1px solid var(--border-soft)", borderRadius: 999, background: "var(--surface-soft)", fontSize: 12 }}>
                  {cancellationMonthLabel(ym)} {count}件
                  <button type="button" className="f4h-btn f4h-btn-ghost f4h-focus" style={{ padding: 2, minHeight: 0, color: "var(--red)" }} title={`${cancellationMonthLabel(ym)}を削除`} onClick={() => handleDeleteCancelMemberMonth(ym, count)}>
                    <Trash2 size={13} />
                  </button>
                </span>
              ))}
            </div>
          ) : (
            <div style={{ color: "var(--ink-faint)", fontSize: 12 }}>—</div>
          )}
        </div>
        {cancelMembers.length > 0 && (
          <div style={{ marginTop: 12 }}>
            <button type="button" className="f4h-btn f4h-btn-outline f4h-focus" style={{ padding: "7px 12px", color: "var(--red)" }} onClick={handleDeleteAllCancelMembers}>
              <Trash2 size={14} /> カウンセリング分析用退会者データをすべて削除
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function ActiveMemberImportPanel({ data, updateData, showToast }) {
  const [activeMembersCsvText, setActiveMembersCsvText] = useState("");
  const [activeMembersImportStats, setActiveMembersImportStats] = useState(null);
  const [activeMembersImportError, setActiveMembersImportError] = useState("");
  const [activeMembersFileName, setActiveMembersFileName] = useState("");
  const [activeMembersSelectedFile, setActiveMembersSelectedFile] = useState(null);
  const activeMembersFileInputRef = useRef(null);
  const activeMembers = normalizeCounselingActiveMembers(data.counselingActiveMembers);
  const activeMembersMeta = normalizeCounselingActiveMembersMeta(data.counselingActiveMembers);

  const reset = () => {
    setActiveMembersCsvText("");
    setActiveMembersImportStats(null);
    setActiveMembersImportError("");
    setActiveMembersFileName("");
    setActiveMembersSelectedFile(null);
    if (activeMembersFileInputRef.current) activeMembersFileInputRef.current.value = "";
  };

  const doParse = useCallback((text, name = "") => {
    const rawText = String(text ?? "");
    const clean = rawText.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
    if (!clean.trim()) {
      const message = "CSV本文を読み取れませんでした。ファイル選択または貼り付け内容を確認してください。";
      setActiveMembersImportStats({
        rows: [],
        stats: activeMemberPreviewStats(clean, { data: [], meta: { fields: [] } }, {
          rowCount: 0,
          validCount: 0,
          excludedCount: 0,
          blankMemberIdCount: 0,
          duplicateMemberIdCount: 0,
        }),
        filename: name || "貼り付けCSV",
        message,
      });
      setActiveMembersImportError(message);
      return;
    }
    setActiveMembersImportError("");
    Papa.parse(clean, {
      header: true,
      skipEmptyLines: "greedy",
      transformHeader: (header) => String(header ?? "").replace(/^\uFEFF/, "").trim().replace(/^[　\s]+|[　\s]+$/g, ""),
      complete: (res) => {
        const rawRows = res.data || [];
        const parsed = parseCounselingActiveMembers(rawRows);
        const message = rawRows.length === 0
          ? "CSV本文を読み取れませんでした。ファイル選択または貼り付け内容を確認してください。"
          : "";
        setActiveMembersImportStats({
          rows: parsed.rows,
          stats: activeMemberPreviewStats(clean, res, parsed.stats),
          filename: name || "貼り付けCSV",
          message,
        });
        setActiveMembersImportError(message);
      },
      error: () => {
        setActiveMembersImportError("CSVの解析に失敗しました。");
        showToast("CSVの解析に失敗しました。", true);
      },
    });
  }, [showToast]);

  const handleActiveMembersFileChange = useCallback(async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    console.info("[counseling active import] file selected", f.name, f.size);
    setActiveMembersFileName(f.name);
    setActiveMembersSelectedFile(f);
    setActiveMembersCsvText("");
    setActiveMembersImportStats(null);
    setActiveMembersImportError("");
    try {
      const text = await f.text();
      setActiveMembersCsvText(text);
    } catch (error) {
      console.warn("[counseling] active member file.text failed", error);
      setActiveMembersImportError("ファイルの読み込みに失敗しました。");
      showToast("ファイルの読み込みに失敗しました。", true);
    }
  }, [showToast]);

  const importActiveMembersCsv = useCallback(async () => {
    if (activeMembersCsvText.trim()) {
      doParse(activeMembersCsvText, activeMembersFileName);
      return;
    }
    if (activeMembersSelectedFile) {
      try {
        const text = await activeMembersSelectedFile.text();
        setActiveMembersCsvText(text);
        doParse(text, activeMembersSelectedFile.name || activeMembersFileName);
        return;
      } catch (error) {
        console.warn("[counseling] active member selectedFile.text failed", error);
        setActiveMembersImportError("ファイルの読み込みに失敗しました。");
        showToast("ファイルの読み込みに失敗しました。", true);
        return;
      }
    }
    doParse("", activeMembersFileName);
  }, [activeMembersCsvText, activeMembersFileName, activeMembersSelectedFile, doParse, showToast]);

  const handleImport = async () => {
    if (!activeMembersImportStats) {
      showToast("CSVを読み込んでください。", true);
      return;
    }
    if (!activeMembersImportStats.rows.length) {
      showToast("保存対象の在籍者データがありません。", true);
      return;
    }
    await updateData("counselingActiveMembers", () => ({
      rows: activeMembersImportStats.rows,
      meta: {
        importedAt: new Date().toISOString(),
        filename: activeMembersImportStats.filename,
        ...activeMembersImportStats.stats,
      },
    }));
    showToast(`在籍者 ${activeMembersImportStats.rows.length}件を保存しました`);
    reset();
  };
  const handleDeleteAll = async () => {
    if (!window.confirm(`保存済み在籍者データ${activeMembers.length}件をすべて削除します。よろしいですか？この操作は元に戻せません。`)) return;
    await updateData("counselingActiveMembers", (cur) => deleteAllCounselingActiveMembers(cur));
    showToast("保存済み在籍者データをすべて削除しました");
  };

  return (
    <div className="f4h-card" style={{ padding: 18 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
        <Upload size={16} /><div style={{ fontWeight: 700, fontSize: 14 }}>hacomono「メンバー一覧（契約中）」CSVを取り込む</div>
      </div>
      <p style={{ fontSize: 12.5, color: "var(--ink-faint)", margin: "2px 0 14px", lineHeight: 1.7 }}>
        契約中CSVは現在の在籍者スナップショットとして全置換保存します。店舗判定は「所属店舗名」、利用開始日は「入会日時」を使います。退会手続き日がある行も除外せず、退会予定として表示します。
      </p>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 10 }}>
        <button type="button" className="f4h-btn f4h-btn-outline f4h-focus" style={{ padding: "8px 14px" }} onClick={() => activeMembersFileInputRef.current?.click()}>
          <Upload size={14} /> CSVファイルを選択
        </button>
        <input
          id="activeMembersCsvInput"
          name="activeMembersCsvInput"
          ref={activeMembersFileInputRef}
          type="file"
          accept=".csv,text/csv"
          data-import-handler="activeMembers"
          style={{ position: "absolute", width: 1, height: 1, opacity: 0, pointerEvents: "none" }}
          onClick={(e) => { e.currentTarget.value = ""; }}
          onChange={handleActiveMembersFileChange}
        />
        <span style={{ fontSize: 12, color: "var(--ink-faint)", alignSelf: "center" }}>または下に貼り付け</span>
      </div>
      <textarea className="f4h-input" rows={4} placeholder="メンバー一覧（契約中）CSVの内容をここに貼り付け..."
        style={{ resize: "vertical", fontFamily: "monospace", fontSize: 12 }}
        value={activeMembersCsvText} onChange={(e) => {
          setActiveMembersCsvText(e.target.value);
          setActiveMembersSelectedFile(null);
          setActiveMembersImportStats(null);
          setActiveMembersImportError("");
        }} />
      <div style={{ marginTop: 8, display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
        <button className="f4h-btn f4h-btn-primary f4h-focus" style={{ padding: "8px 16px" }} onClick={importActiveMembersCsv}>
          読み込む
        </button>
        <button className="f4h-btn f4h-btn-outline f4h-focus" style={{ padding: "8px 14px" }} disabled={!activeMembersCsvText && !activeMembersSelectedFile && !activeMembersImportStats && !activeMembersImportError} onClick={reset}>
          <X size={13} /> リセット
        </button>
      </div>
      <div style={{ marginTop: 10, display: "flex", gap: 14, fontSize: 12.5, color: "var(--ink-soft)", flexWrap: "wrap" }}>
        <CounselingStatLine label="選択中ファイル名" value={activeMembersFileName || "—"} />
        <CounselingStatLine label="CSV本文文字数" value={`${activeMembersCsvText.length}文字`} />
        <CounselingStatLine label="selectedFile" value={activeMembersSelectedFile ? "あり" : "なし"} />
        <CounselingStatLine label="handler" value="activeMembers" />
      </div>
      {activeMembersImportError && !activeMembersImportStats && (
        <div style={{ display: "flex", gap: 6, alignItems: "center", color: "var(--red)", fontSize: 12.5, marginTop: 10 }}>
          <AlertTriangle size={14} /> {activeMembersImportError}
        </div>
      )}

      {activeMembersImportStats && (
        <div className="f4h-fade-in" style={{ marginTop: 18, borderTop: "1px solid var(--border-soft)", paddingTop: 16 }}>
          <div style={{ display: "flex", gap: 14, fontSize: 12.5, color: "var(--ink-soft)", marginBottom: 8, flexWrap: "wrap" }}>
            <CounselingStatLine label="CSV本文文字数" value={`${activeMembersImportStats.stats.csvCharCount || 0}文字`} />
            <CounselingStatLine label="parse後総行数" value={`${activeMembersImportStats.stats.parsedRowCount || 0}件`} />
            <CounselingStatLine label="今回取込の総行数" value={`${activeMembersImportStats.stats.rowCount}件`} />
            <CounselingStatLine label="有効件数" value={`${activeMembersImportStats.stats.validCount}件`} />
            <CounselingStatLine label="対象外件数" value={`${activeMembersImportStats.stats.excludedCount}件`} />
            <CounselingStatLine label="メンバーID空欄除外" value={`${activeMembersImportStats.stats.blankMemberIdCount}件`} />
            <CounselingStatLine label="メンバーID重複" value={`${activeMembersImportStats.stats.duplicateMemberIdCount}件`} />
            <span>ファイル <b>{activeMembersImportStats.filename}</b></span>
          </div>
          <div style={{ fontSize: 12, color: "var(--ink-faint)", marginBottom: 10, lineHeight: 1.6 }}>
            検出したヘッダー列名: {activeMembersImportStats.stats.headerFields?.length ? activeMembersImportStats.stats.headerFields.join(" / ") : "—"}
          </div>
          {activeMembersImportStats.message && (
            <div style={{ display: "flex", gap: 6, alignItems: "center", color: "var(--red)", fontSize: 12.5, marginBottom: 10 }}>
              <AlertTriangle size={14} /> {activeMembersImportStats.message}
            </div>
          )}
          {activeMembersImportStats.rows.length === 0 ? (
            <div style={{ display: "flex", gap: 6, alignItems: "center", color: "var(--red)", fontSize: 12.5, marginBottom: 10 }}>
              <AlertTriangle size={14} /> 保存対象の在籍者データが見つかりません。
            </div>
          ) : (
            <>
              <div className="scrollbar-thin" style={{ maxHeight: 220, overflow: "auto", border: "1px solid var(--border-soft)", borderRadius: 8, marginBottom: 12 }}>
                <table className="f4h-table">
                  <thead><tr><th>メンバーID</th><th>氏名</th><th>店舗</th><th>ステータス</th><th>利用開始日</th><th>利用開始月</th><th>契約プラン</th></tr></thead>
                  <tbody>
                    {activeMembersImportStats.rows.slice(0, 50).map((r) => (
                      <tr key={r.memberId}>
                        <td>{r.memberId}</td>
                        <td style={{ textAlign: "left" }}>{r.name || "—"}</td>
                        <td style={{ textAlign: "left" }}>{r.store || "—"}</td>
                        <td>{r.statusCategory}</td>
                        <td>{r.startDate || "—"}</td>
                        <td>{r.startMonth || "—"}</td>
                        <td style={{ textAlign: "left" }}>{r.planName || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button className="f4h-btn f4h-btn-primary f4h-focus" style={{ padding: "9px 18px" }} onClick={handleImport}>
                <Check size={15} /> 在籍者 {activeMembersImportStats.rows.length}件を保存する
              </button>
            </>
          )}
        </div>
      )}

      <div style={{ marginTop: 14, fontSize: 12.5, color: "var(--ink-soft)" }}>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <CounselingStatLine label="保存済み在籍者データ 合計" value={`${activeMembers.length}件`} />
          <CounselingStatLine label="最終取込日時" value={activeMembersMeta.importedAt ? new Date(activeMembersMeta.importedAt).toLocaleString("ja-JP") : "—"} />
          <CounselingStatLine label="直近取込ファイル名" value={activeMembersMeta.filename || "—"} />
          <CounselingStatLine label="今回取込の総行数" value={`${activeMembersMeta.rowCount || 0}件`} />
          <CounselingStatLine label="有効件数" value={`${activeMembersMeta.validCount || activeMembers.length || 0}件`} />
          <CounselingStatLine label="メンバーID空欄除外" value={`${activeMembersMeta.blankMemberIdCount || 0}件`} />
          <CounselingStatLine label="重複除外/上書き" value={`${activeMembersMeta.duplicateMemberIdCount || 0}件`} />
        </div>
        {activeMembers.length > 0 && (
          <div style={{ marginTop: 12 }}>
            <button type="button" className="f4h-btn f4h-btn-outline f4h-focus" style={{ padding: "7px 12px", color: "var(--red)" }} onClick={handleDeleteAll}>
              <Trash2 size={14} /> 在籍者データをすべて削除
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function NewMemberImportPanel({ data, updateData, showToast }) {
  const newMembers = normalizeCounselingNewMembers(data.counselingNewMembers);
  const newMembersMeta = normalizeCounselingNewMembersMeta(data.counselingNewMembers);
  const newMemberMonthCounts = monthlyCounselingMemberCounts(newMembers, counselingNewMemberMonthOf);

  const handleDeleteMonth = async (ym, count) => {
    if (!window.confirm(`${cancellationMonthLabel(ym)}の新規入会者データ${count}件を削除します。よろしいですか？`)) return;
    await updateData("counselingNewMembers", (cur) => deleteCounselingMemberMonth(
      cur,
      ym,
      counselingNewMemberMonthOf,
      normalizeCounselingNewMembers,
      normalizeCounselingNewMembersMeta
    ));
    showToast(`${cancellationMonthLabel(ym)}の新規入会者データを削除しました`);
  };
  const handleDeleteAll = async () => {
    if (!window.confirm("新規入会者データをすべて削除します。よろしいですか？この操作は元に戻せません。")) return;
    await updateData("counselingNewMembers", (cur) => deleteAllCounselingMembers(cur, normalizeCounselingNewMembersMeta));
    showToast("新規入会者データをすべて削除しました");
  };

  return (
    <div className="f4h-card" style={{ padding: 18 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
        <Info size={16} /><div style={{ fontWeight: 700, fontSize: 14 }}>新規入会者CSVの取込口について</div>
      </div>
      <p style={{ fontSize: 12.5, color: "var(--ink-faint)", margin: "2px 0 14px", lineHeight: 1.7 }}>
        新規入会者CSVは「入会者データ」タブから取り込むと、CVR分析とカウンセリング分析の両方に反映されます。
      </p>
      <div style={{ marginTop: 14, fontSize: 12.5, color: "var(--ink-soft)" }}>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <CounselingStatLine label="保存済み新規入会者データ 合計" value={`${newMembers.length}件`} />
          <CounselingStatLine label="最終取込日時" value={newMembersMeta.importedAt ? new Date(newMembersMeta.importedAt).toLocaleString("ja-JP") : "—"} />
          <CounselingStatLine label="直近取込ファイル名" value={newMembersMeta.filename || "—"} />
          <CounselingStatLine label="今回取込の総行数" value={`${newMembersMeta.rowCount || 0}件`} />
          <CounselingStatLine label="有効件数" value={`${newMembersMeta.validCount || newMembers.length || 0}件`} />
          <CounselingStatLine label="メンバーID空欄除外" value={`${newMembersMeta.blankMemberIdCount || 0}件`} />
          <CounselingStatLine label="重複除外/上書き" value={`${newMembersMeta.duplicateMemberIdCount || 0}件`} />
        </div>
        <div style={{ marginTop: 10 }}>
          <div style={{ fontWeight: 700, fontSize: 12, color: "var(--ink-faint)", marginBottom: 4 }}>登録済み月</div>
          {newMemberMonthCounts.length ? (
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {newMemberMonthCounts.map(({ ym, count }) => (
                <span key={ym} style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 8px", border: "1px solid var(--border-soft)", borderRadius: 999, background: "var(--surface-soft)" }}>
                  {cancellationMonthLabel(ym)} {count}件
                  <button type="button" className="f4h-btn f4h-btn-ghost f4h-focus" style={{ padding: 2, minHeight: 0, color: "var(--red)" }} title={`${cancellationMonthLabel(ym)}を削除`} onClick={() => handleDeleteMonth(ym, count)}>
                    <Trash2 size={13} />
                  </button>
                </span>
              ))}
            </div>
          ) : (
            <div style={{ color: "var(--ink-faint)" }}>—</div>
          )}
        </div>
        {newMembers.length > 0 && (
          <div style={{ marginTop: 12 }}>
            <button type="button" className="f4h-btn f4h-btn-outline f4h-focus" style={{ padding: "7px 12px", color: "var(--red)" }} onClick={handleDeleteAll}>
              <Trash2 size={14} /> 新規入会者データをすべて削除
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function CancelMemberImportPanel({ data, updateData, showToast }) {
  const [cancelMembersCsvText, setCancelMembersCsvText] = useState("");
  const [cancelMembersImportStats, setCancelMembersImportStats] = useState(null);
  const [cancelMembersImportError, setCancelMembersImportError] = useState("");
  const [cancelMembersFileName, setCancelMembersFileName] = useState("");
  const [cancelMembersSelectedFile, setCancelMembersSelectedFile] = useState(null);
  const cancelMembersFileInputRef = useRef(null);
  const cancelMembers = normalizeCounselingCancelMembers(data.counselingCancelMembers);
  const cancelMembersMeta = normalizeCounselingCancelMembersMeta(data.counselingCancelMembers);
  const cancelMemberMonthCounts = monthlyCounselingMemberCounts(cancelMembers, counselingCancelMemberMonthOf);

  const reset = () => {
    setCancelMembersCsvText("");
    setCancelMembersImportStats(null);
    setCancelMembersImportError("");
    setCancelMembersFileName("");
    setCancelMembersSelectedFile(null);
    if (cancelMembersFileInputRef.current) cancelMembersFileInputRef.current.value = "";
  };

  const doParse = useCallback((text, name = "") => {
    const rawText = String(text ?? "");
    const clean = rawText.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
    if (!clean.trim()) {
      const message = "CSV本文を読み取れませんでした。ファイル選択または貼り付け内容を確認してください。";
      setCancelMembersImportStats({
        rows: [],
        stats: activeMemberPreviewStats(clean, { data: [], meta: { fields: [] } }, {
          rowCount: 0, validCount: 0, excludedCount: 0, blankMemberIdCount: 0, duplicateMemberIdCount: 0, unknownStartDateCount: 0, unknownCancelMonthCount: 0,
        }),
        filename: name || "貼り付けCSV",
        message,
      });
      setCancelMembersImportError(message);
      return;
    }
    setCancelMembersImportError("");
    Papa.parse(clean, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => String(header ?? "").replace(/^\uFEFF/, "").trim().replace(/^[　\s]+|[　\s]+$/g, ""),
      complete: (res) => {
        const rawRows = res.data || [];
        const parsed = parseCounselingCancelMembers(rawRows, data.counselingNewMembers);
        const message = rawRows.length === 0 ? "CSV本文を読み取れませんでした。ファイル選択または貼り付け内容を確認してください。" : "";
        setCancelMembersImportStats({
          rows: parsed.rows,
          stats: activeMemberPreviewStats(clean, res, parsed.stats),
          filename: name || "貼り付けCSV",
          message,
        });
        setCancelMembersImportError(message);
      },
      error: () => {
        setCancelMembersImportError("CSVの解析に失敗しました。");
        showToast("CSVの解析に失敗しました。", true);
      },
    });
  }, [data.counselingNewMembers, showToast]);

  const handleCancelMembersFileChange = useCallback(async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    console.info("[counseling cancel import] file selected", f.name, f.size);
    setCancelMembersFileName(f.name);
    setCancelMembersSelectedFile(f);
    setCancelMembersCsvText("");
    setCancelMembersImportStats(null);
    setCancelMembersImportError("");
    try {
      const text = await f.text();
      setCancelMembersCsvText(text);
    } catch (error) {
      console.warn("[counseling] cancel member file.text failed", error);
      setCancelMembersImportError("ファイルの読み込みに失敗しました。");
      showToast("ファイルの読み込みに失敗しました。", true);
    }
  }, [showToast]);

  const importCancelMembersCsv = useCallback(async () => {
    if (cancelMembersCsvText.trim()) {
      doParse(cancelMembersCsvText, cancelMembersFileName);
      return;
    }
    if (cancelMembersSelectedFile) {
      try {
        const text = await cancelMembersSelectedFile.text();
        setCancelMembersCsvText(text);
        doParse(text, cancelMembersSelectedFile.name || cancelMembersFileName);
        return;
      } catch (error) {
        console.warn("[counseling] cancel member selectedFile.text failed", error);
        setCancelMembersImportError("ファイルの読み込みに失敗しました。");
        showToast("ファイルの読み込みに失敗しました。", true);
        return;
      }
    }
    doParse("", cancelMembersFileName);
  }, [cancelMembersCsvText, cancelMembersFileName, cancelMembersSelectedFile, doParse, showToast]);

  const handleImport = async () => {
    if (!cancelMembersImportStats) {
      showToast("CSVを読み込んでください。", true);
      return;
    }
    if (!cancelMembersImportStats.rows.length) {
      showToast("保存対象の退会者データがありません。", true);
      return;
    }
    await updateData("counselingCancelMembers", (cur) => (
      mergeCounselingMemberMonthImport(
        cur,
        cancelMembersImportStats.rows,
        cancelMembersImportStats.stats,
        cancelMembersImportStats.filename,
        counselingCancelMemberMonthOf
      )
    ));
    showToast(`退会者 ${cancelMembersImportStats.rows.length}件を保存しました`);
    reset();
  };

  return (
    <div className="f4h-card" style={{ padding: 18 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
        <Upload size={16} /><div style={{ fontWeight: 700, fontSize: 14 }}>hacomono「メンバー一覧（退会）」CSVを取り込む</div>
      </div>
      <p style={{ fontSize: 12.5, color: "var(--ink-faint)", margin: "2px 0 14px", lineHeight: 1.7 }}>
        退会CSVは全置換保存します。退会月は「プラン契約適用終了日」、店舗判定は「所属店舗名」を使います。利用開始日は同じメンバーIDが新規入会CSVにあればそちらを優先し、なければ退会CSVの「入会日時」を使います。
      </p>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 10 }}>
        <button type="button" className="f4h-btn f4h-btn-outline f4h-focus" style={{ padding: "8px 14px" }} onClick={() => cancelMembersFileInputRef.current?.click()}>
          <Upload size={14} /> CSVファイルを選択
        </button>
        <input
          id="cancelMembersCsvInput"
          name="cancelMembersCsvInput"
          ref={cancelMembersFileInputRef}
          type="file"
          accept=".csv,text/csv"
          data-import-handler="cancelMembers"
          style={{ position: "absolute", width: 1, height: 1, opacity: 0, pointerEvents: "none" }}
          onClick={(e) => { e.currentTarget.value = ""; }}
          onChange={handleCancelMembersFileChange}
        />
        <span style={{ fontSize: 12, color: "var(--ink-faint)", alignSelf: "center" }}>または下に貼り付け</span>
      </div>
      <textarea className="f4h-input" rows={4} placeholder="メンバー一覧（退会）CSVの内容をここに貼り付け..."
        style={{ resize: "vertical", fontFamily: "monospace", fontSize: 12 }}
        value={cancelMembersCsvText} onChange={(e) => {
          setCancelMembersCsvText(e.target.value);
          setCancelMembersSelectedFile(null);
          setCancelMembersFileName("貼り付け入力");
          setCancelMembersImportStats(null);
          setCancelMembersImportError("");
        }} />
      <div style={{ marginTop: 8, display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
        <button className="f4h-btn f4h-btn-primary f4h-focus" style={{ padding: "8px 16px" }} onClick={importCancelMembersCsv}>
          読み込む
        </button>
        <button className="f4h-btn f4h-btn-outline f4h-focus" style={{ padding: "8px 14px" }} disabled={!cancelMembersCsvText && !cancelMembersSelectedFile && !cancelMembersImportStats && !cancelMembersImportError} onClick={reset}>
          <X size={13} /> リセット
        </button>
      </div>
      <div style={{ marginTop: 10, display: "flex", gap: 14, fontSize: 12.5, color: "var(--ink-soft)", flexWrap: "wrap" }}>
        <CounselingStatLine label="選択中ファイル名" value={cancelMembersFileName || "—"} />
        <CounselingStatLine label="CSV本文文字数" value={`${cancelMembersCsvText.length}文字`} />
        <CounselingStatLine label="selectedFile" value={cancelMembersSelectedFile ? "あり" : "なし"} />
        <CounselingStatLine label="handler" value="cancelMembers" />
      </div>
      {cancelMembersImportError && !cancelMembersImportStats && (
        <div style={{ display: "flex", gap: 6, alignItems: "center", color: "var(--red)", fontSize: 12.5, marginTop: 10 }}>
          <AlertTriangle size={14} /> {cancelMembersImportError}
        </div>
      )}
      {cancelMembersImportStats && (
        <div className="f4h-fade-in" style={{ marginTop: 18, borderTop: "1px solid var(--border-soft)", paddingTop: 16 }}>
          <div style={{ display: "flex", gap: 14, fontSize: 12.5, color: "var(--ink-soft)", marginBottom: 8, flexWrap: "wrap" }}>
            <CounselingStatLine label="CSV本文文字数" value={`${cancelMembersImportStats.stats.csvCharCount || 0}文字`} />
            <CounselingStatLine label="parse後総行数" value={`${cancelMembersImportStats.stats.parsedRowCount || 0}件`} />
            <CounselingStatLine label="今回取込の総行数" value={`${cancelMembersImportStats.stats.rowCount}件`} />
            <CounselingStatLine label="有効件数" value={`${cancelMembersImportStats.stats.validCount}件`} />
            <CounselingStatLine label="メンバーID空欄除外" value={`${cancelMembersImportStats.stats.blankMemberIdCount}件`} />
            <CounselingStatLine label="メンバーID重複" value={`${cancelMembersImportStats.stats.duplicateMemberIdCount}件`} />
            <CounselingStatLine label="利用開始日不明" value={`${cancelMembersImportStats.stats.unknownStartDateCount || 0}件`} />
            <CounselingStatLine label="退会月不明" value={`${cancelMembersImportStats.stats.unknownCancelMonthCount || 0}件`} />
            <span>ファイル <b>{cancelMembersImportStats.filename}</b></span>
          </div>
          <div style={{ fontSize: 12, color: "var(--ink-faint)", marginBottom: 10, lineHeight: 1.6 }}>
            検出したヘッダー列名: {cancelMembersImportStats.stats.headerFields?.length ? cancelMembersImportStats.stats.headerFields.join(" / ") : "—"}
          </div>
          {cancelMembersImportStats.message && (
            <div style={{ display: "flex", gap: 6, alignItems: "center", color: "var(--red)", fontSize: 12.5, marginBottom: 10 }}>
              <AlertTriangle size={14} /> {cancelMembersImportStats.message}
            </div>
          )}
          {cancelMembersImportStats.rows.length === 0 ? (
            <div style={{ display: "flex", gap: 6, alignItems: "center", color: "var(--red)", fontSize: 12.5, marginBottom: 10 }}>
              <AlertTriangle size={14} /> 保存対象の退会者データが見つかりません。
            </div>
          ) : (
            <>
              <div className="scrollbar-thin" style={{ maxHeight: 220, overflow: "auto", border: "1px solid var(--border-soft)", borderRadius: 8, marginBottom: 12 }}>
                <table className="f4h-table">
                  <thead><tr><th>メンバーID</th><th>氏名</th><th>店舗</th><th>退会月</th><th>プラン終了日</th><th>利用開始日</th><th>入会日時</th><th>契約プラン</th></tr></thead>
                  <tbody>
                    {cancelMembersImportStats.rows.slice(0, 50).map((r) => (
                      <tr key={r.memberId}>
                        <td>{r.memberId}</td>
                        <td style={{ textAlign: "left" }}>{r.name || "—"}</td>
                        <td style={{ textAlign: "left" }}>{r.store || "—"}</td>
                        <td>{r.cancelMonth || "—"}</td>
                        <td>{r.planEndDate || "—"}</td>
                        <td>{r.startDate || "—"}</td>
                        <td>{r.joinDate || "—"}</td>
                        <td style={{ textAlign: "left" }}>{r.planName || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button className="f4h-btn f4h-btn-primary f4h-focus" style={{ padding: "9px 18px" }} onClick={handleImport}>
                <Check size={15} /> 退会者 {cancelMembersImportStats.rows.length}件を保存する
              </button>
            </>
          )}
        </div>
      )}
      <div style={{ marginTop: 14, fontSize: 12.5, color: "var(--ink-soft)" }}>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <CounselingStatLine label="保存済み退会者データ 合計" value={`${cancelMembers.length}件`} />
          <CounselingStatLine label="最終取込日時" value={cancelMembersMeta.importedAt ? new Date(cancelMembersMeta.importedAt).toLocaleString("ja-JP") : "—"} />
          <CounselingStatLine label="直近取込ファイル名" value={cancelMembersMeta.filename || "—"} />
          <CounselingStatLine label="今回取込の総行数" value={`${cancelMembersMeta.rowCount || 0}件`} />
          <CounselingStatLine label="有効件数" value={`${cancelMembersMeta.validCount || cancelMembers.length || 0}件`} />
          <CounselingStatLine label="メンバーID空欄除外" value={`${cancelMembersMeta.blankMemberIdCount || 0}件`} />
          <CounselingStatLine label="重複除外/上書き" value={`${cancelMembersMeta.duplicateMemberIdCount || 0}件`} />
          <CounselingStatLine label="退会月不明" value={`${cancelMembersMeta.unknownCancelMonthCount || 0}件`} />
        </div>
        <div style={{ marginTop: 10 }}>
          <div style={{ fontWeight: 700, fontSize: 12, color: "var(--ink-faint)", marginBottom: 4 }}>登録済み退会月</div>
          {cancelMemberMonthCounts.length ? (
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {cancelMemberMonthCounts.map(({ ym, count }) => (
                <span key={ym} style={{ padding: "4px 8px", border: "1px solid var(--border-soft)", borderRadius: 999, background: "var(--surface-soft)" }}>
                  {cancellationMonthLabel(ym)} {count}件
                </span>
              ))}
            </div>
          ) : (
            <div style={{ color: "var(--ink-faint)" }}>—</div>
          )}
        </div>
      </div>
    </div>
  );
}

function CounselingKpiCard({ label, value, sub }) {
  return (
    <div className="f4h-card" style={{ padding: 14, minHeight: 86 }}>
      <div style={{ fontSize: 11.5, color: "var(--ink-faint)", marginBottom: 6 }}>{label}</div>
      <div className="num" style={{ fontSize: 24, fontWeight: 800, lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ marginTop: 7, fontSize: 11.5, color: "var(--ink-soft)" }}>{sub}</div>}
    </div>
  );
}

function CounselingDefinitionNote() {
  return (
    <div className="f4h-card" style={{ padding: 14, background: "var(--surface-soft)" }}>
      <div style={{ fontSize: 12, color: "var(--ink-soft)", fontWeight: 800, marginBottom: 6 }}>カウンセリング回数の定義</div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", fontSize: 12.5, color: "var(--ink-soft)", lineHeight: 1.6 }}>
        {COUNSELING_PROGRESS_DEFINITION.map((text) => <span key={text}>{text}</span>)}
      </div>
    </div>
  );
}
function counselingCurrentYm() {
  const now = new Date();
  return cancellationYm(now.getFullYear(), now.getMonth() + 1);
}
function counselingPeriodFromMode(mode, customStartYm, customEndYm) {
  const current = counselingCurrentYm();
  if (mode === "all") return { mode, label: "全期間", startYm: null, endYm: null };
  if (mode === "current") return { mode, label: "当月", startYm: current, endYm: current };
  if (mode === "previous") {
    const ym = cancellationYmFromIndex(cancellationYmIndex(current) - 1);
    return { mode, label: "前月", startYm: ym, endYm: ym };
  }
  if (mode === "recent3") return { mode, label: "直近3ヶ月", startYm: cancellationYmFromIndex(cancellationYmIndex(current) - 2), endYm: current };
  if (mode === "recent6") return { mode, label: "直近半年", startYm: cancellationYmFromIndex(cancellationYmIndex(current) - 5), endYm: current };
  const start = customStartYm || current;
  const end = customEndYm || start;
  return cancellationYmIndex(start) <= cancellationYmIndex(end)
    ? { mode, label: `${counselingMonthLabel(start)}〜${counselingMonthLabel(end)}`, startYm: start, endYm: end }
    : { mode, label: `${counselingMonthLabel(end)}〜${counselingMonthLabel(start)}`, startYm: end, endYm: start };
}
function counselingYmInPeriod(ym, period) {
  if (!period?.startYm && !period?.endYm) return true;
  if (!ym) return false;
  const index = cancellationYmIndex(ym);
  if (period.startYm && index < cancellationYmIndex(period.startYm)) return false;
  if (period.endYm && index > cancellationYmIndex(period.endYm)) return false;
  return true;
}
const COUNSELING_PERIOD_TABS = [
  { key: "all", label: "全期間" },
  { key: "current", label: "当月" },
  { key: "previous", label: "前月" },
  { key: "recent3", label: "直近3ヶ月" },
  { key: "recent6", label: "直近半年" },
  { key: "custom", label: "期間指定" },
];
function CounselingPeriodFilter({ periodMode, setPeriodMode, customStartYm, setCustomStartYm, customEndYm, setCustomEndYm, basisLabel }) {
  const startParts = (customStartYm || counselingCurrentYm()).split("-").map(Number);
  const endParts = (customEndYm || customStartYm || counselingCurrentYm()).split("-").map(Number);
  return (
    <div className="f4h-card" style={{ padding: 14, display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
        <span style={{ fontSize: 12, color: "var(--ink-faint)", fontWeight: 800 }}>{basisLabel}で絞り込み中</span>
        {COUNSELING_PERIOD_TABS.map((tab) => (
          <Pill key={tab.key} active={periodMode === tab.key} onClick={() => setPeriodMode(tab.key)}>{tab.label}</Pill>
        ))}
      </div>
      {periodMode === "custom" && (
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
          <span style={{ fontSize: 12, color: "var(--ink-faint)", fontWeight: 700 }}>開始月</span>
          <MonthPicker year={startParts[0]} month={startParts[1]} onChange={(y, m) => setCustomStartYm(cancellationYm(y, m))} />
          <span style={{ fontSize: 12, color: "var(--ink-faint)", fontWeight: 700 }}>終了月</span>
          <MonthPicker year={endParts[0]} month={endParts[1]} onChange={(y, m) => setCustomEndYm(cancellationYm(y, m))} />
        </div>
      )}
    </div>
  );
}
function counselingActionListRows(rows, key) {
  if (key === "first") return rows.filter((row) => row.checkedStage === 0);
  if (key === "second") return rows.filter((row) => row.checkedStage <= 1);
  if (key === "third") return rows.filter((row) => row.checkedStage <= 2);
  if (key === "under3") return rows.filter((row) => row.checkedStage < 3);
  if (key === "under4") return rows.filter((row) => row.checkedStage < 4);
  if (key === "retiringUnder3") return rows.filter((row) => row.statusCategory === "退会予定" && row.checkedStage < 3);
  return rows;
}
function CounselingActionListTable({ rows, mode = "active", limit = 120 }) {
  const visibleRows = rows.slice(0, limit);
  return (
    <div className="scrollbar-thin" style={{ overflow: "auto", border: "1px solid var(--border-soft)", borderRadius: 8 }}>
      <table className="f4h-table">
        <thead>
          <tr>
            <th>メンバーID</th><th>氏名</th><th>店舗</th>
            {mode === "active" && <th>ステータス区分</th>}
            <th>利用開始日</th><th>利用開始月</th>
            {mode === "retiring" && <th>退会手続き日</th>}
            <th>カウンセリング回数</th><th>最新カウンセリング日</th><th>最後に受けた種別</th><th>次に必要なカウンセリング</th>
          </tr>
        </thead>
        <tbody>
          {visibleRows.map((row) => (
            <tr key={row.memberId} style={row.statusCategory === "退会予定" ? { background: "var(--amber-soft)" } : undefined}>
              <td>{row.memberId}</td>
              <td style={{ textAlign: "left" }}>{row.name || "—"}</td>
              <td style={{ textAlign: "left" }}>{row.store || "—"}</td>
              {mode === "active" && <td>{row.statusCategory || "—"}</td>}
              <td>{row.startDate || "—"}</td>
              <td>{row.startMonth || "—"}</td>
              {mode === "retiring" && <td>{row.cancellationRequestDate || "—"}</td>}
              <td>{row.checkedStage >= 4 ? "4回目以降" : `${row.checkedStage || 0}回`}（{counselingStageLabel(row.checkedStage)}）</td>
              <td>{row.finalCounselingDate || "—"}</td>
              <td style={{ textAlign: "left" }}>{row.finalCounselingName || "—"}</td>
              <td style={{ textAlign: "left" }}>{row.nextCounseling}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length > limit && (
        <div style={{ padding: 10, fontSize: 12, color: "var(--ink-faint)" }}>先頭{limit}件を表示中（全{rows.length}件）</div>
      )}
    </div>
  );
}
function CounselingInitialBreakdown({ rows }) {
  const firstMissingRows = rows.filter((row) => row.checkedStage === 0);
  const storeCounts = Object.fromEntries(STORE_KEYS.map((store) => [store, 0]));
  const monthStoreCounts = {};
  for (const row of firstMissingRows) {
    if (STORE_KEYS.includes(row.store)) storeCounts[row.store] += 1;
    const ym = row.startMonth || "不明";
    if (!monthStoreCounts[ym]) monthStoreCounts[ym] = { ym, all: 0, ...Object.fromEntries(STORE_KEYS.map((store) => [store, 0])) };
    monthStoreCounts[ym].all += 1;
    if (STORE_KEYS.includes(row.store)) monthStoreCounts[ym][row.store] += 1;
  }
  const monthRows = Object.values(monthStoreCounts).sort((a, b) => String(b.ym).localeCompare(String(a.ym)));
  return (
    <div className="f4h-card" style={{ padding: 16 }}>
      <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 10 }}>初回未実施者の内訳</div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 12, fontSize: 12.5, color: "var(--ink-soft)" }}>
        <CounselingStatLine label="全店" value={`${firstMissingRows.length}人`} />
        {STORE_KEYS.map((store) => <CounselingStatLine key={store} label={store} value={`${storeCounts[store] || 0}人`} />)}
      </div>
      {monthRows.length === 0 ? (
        <div style={{ color: "var(--ink-faint)", fontSize: 12.5 }}>初回未実施者はいません。</div>
      ) : (
        <div className="scrollbar-thin" style={{ overflow: "auto", border: "1px solid var(--border-soft)", borderRadius: 8 }}>
          <table className="f4h-table">
            <thead><tr><th>入会月</th><th>全店</th>{STORE_KEYS.map((store) => <th key={store}>{store}</th>)}</tr></thead>
            <tbody>
              {monthRows.map((row) => (
                <tr key={row.ym}>
                  <td>{row.ym === "不明" ? "不明" : counselingMonthLabel(row.ym)}</td>
                  <td className="num">{row.all}</td>
                  {STORE_KEYS.map((store) => <td key={store} className="num">{row[store] || 0}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function CounselingCollapsibleSection({ title, sub, open, onToggle, children }) {
  return (
    <section style={{ display: "flex", flexDirection: "column", gap: open ? 12 : 0 }}>
      <button
        type="button"
        className="f4h-btn f4h-btn-ghost f4h-focus"
        onClick={onToggle}
        aria-expanded={open}
        style={{
          justifyContent: "space-between",
          width: "100%",
          padding: "10px 12px",
          border: "1px solid var(--border-soft)",
          borderRadius: 8,
          background: "var(--surface)",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 8, textAlign: "left" }}>
          {open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          <span>
            <span style={{ display: "block", fontSize: 14, fontWeight: 800 }}>{title}</span>
            {sub && <span style={{ display: "block", marginTop: 2, fontSize: 11.5, color: "var(--ink-faint)" }}>{sub}</span>}
          </span>
        </span>
      </button>
      {open && <div className="f4h-fade-in" style={{ display: "flex", flexDirection: "column", gap: 12 }}>{children}</div>}
    </section>
  );
}

function ActiveCounselingProgressSection({ data }) {
  const [storeFilter, setStoreFilter] = useState("all");
  const [periodMode, setPeriodMode] = useState("all");
  const [customStartYm, setCustomStartYm] = useState(counselingCurrentYm());
  const [customEndYm, setCustomEndYm] = useState(counselingCurrentYm());
  const [listMode, setListMode] = useState("first");
  const progressRows = useMemo(
    () => buildActiveCounselingProgress(data.counselingActiveMembers, data.counselingReservations),
    [data.counselingActiveMembers, data.counselingReservations]
  );
  const period = useMemo(() => counselingPeriodFromMode(periodMode, customStartYm, customEndYm), [periodMode, customStartYm, customEndYm]);
  const filteredRows = useMemo(() => progressRows.filter((row) => {
    if (storeFilter !== "all" && row.store !== storeFilter) return false;
    return counselingYmInPeriod(row.startMonth, period);
  }), [progressRows, storeFilter, period]);
  const total = filteredRows.length;
  const stageCounts = [0, 1, 2, 3, 4].map((stage) => (
    stage === 4 ? filteredRows.filter((row) => row.checkedStage >= 4).length : filteredRows.filter((row) => row.checkedStage === stage).length
  ));
  const reached3 = filteredRows.filter((row) => row.checkedStage >= 3).length;
  const under3 = filteredRows.filter((row) => row.checkedStage < 3).length;
  const under4 = filteredRows.filter((row) => row.checkedStage < 4).length;
  const retiring = filteredRows.filter((row) => row.statusCategory === "退会予定").length;
  const retiringFirstMissing = filteredRows.filter((row) => row.statusCategory === "退会予定" && row.checkedStage === 0).length;
  const retiringUnder3 = filteredRows.filter((row) => row.statusCategory === "退会予定" && row.checkedStage < 3).length;
  const retiringUnder4 = filteredRows.filter((row) => row.statusCategory === "退会予定" && row.checkedStage < 4).length;
  const listTabs = [
    { key: "first", label: "初回未実施" },
    { key: "second", label: "2回目未実施" },
    { key: "third", label: "3回目未実施" },
    { key: "under3", label: "3回未満" },
    { key: "under4", label: "4回未到達" },
  ];
  const actionRows = counselingActionListRows(filteredRows, listMode);
  const retiringUnder3Rows = counselingActionListRows(filteredRows, "retiringUnder3");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
    <div className="f4h-card" style={{ padding: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start", flexWrap: "wrap", marginBottom: 14 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 800, color: "var(--ink-faint)", letterSpacing: ".05em", marginBottom: 4 }}>在籍者分析</div>
          <div style={{ fontSize: 20, fontWeight: 800 }}>在籍者のカウンセリング進捗</div>
          <div style={{ marginTop: 4, fontSize: 12.5, color: "var(--ink-faint)" }}>利用開始月で絞り込み中：{period.label}</div>
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <Pill active={storeFilter === "all"} onClick={() => setStoreFilter("all")}>全店</Pill>
          {STORE_KEYS.map((store) => (
            <Pill key={store} active={storeFilter === store} onClick={() => setStoreFilter(store)}>{store}</Pill>
          ))}
        </div>
      </div>

      <CounselingPeriodFilter
        periodMode={periodMode}
        setPeriodMode={setPeriodMode}
        customStartYm={customStartYm}
        setCustomStartYm={setCustomStartYm}
        customEndYm={customEndYm}
        setCustomEndYm={setCustomEndYm}
        basisLabel="利用開始月"
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(132px, 1fr))", gap: 10, marginBottom: 14 }}>
        <CounselingKpiCard label="在籍者数" value={`${num(total)}人`} />
        <CounselingKpiCard label="初回未実施" value={`${num(stageCounts[0])}人`} sub="0回" />
        <CounselingKpiCard label="初回済み" value={`${num(stageCounts[1])}人`} sub="1回" />
        <CounselingKpiCard label="2回目済み" value={`${num(stageCounts[2])}人`} sub="2回" />
        <CounselingKpiCard label="3回目済み" value={`${num(stageCounts[3])}人`} sub="3回" />
        <CounselingKpiCard label="4回目以降済み" value={`${num(stageCounts[4])}人`} sub="4回目以降" />
        <CounselingKpiCard label="3回目到達率" value={total ? pct1(reached3 / total) : "—"} />
        <CounselingKpiCard label="3回未満人数" value={`${num(under3)}人`} />
        <CounselingKpiCard label="4回目以降未到達人数" value={`${num(under4)}人`} />
        <CounselingKpiCard label="退会予定者数" value={`${num(retiring)}人`} />
        <CounselingKpiCard label="退会予定かつ初回未実施" value={`${num(retiringFirstMissing)}人`} />
        <CounselingKpiCard label="退会予定かつ3回未満" value={`${num(retiringUnder3)}人`} />
        <CounselingKpiCard label="退会予定かつ4回未到達" value={`${num(retiringUnder4)}人`} />
      </div>

      <CounselingDefinitionNote />

      <p style={{ fontSize: 12.5, color: "var(--ink-faint)", lineHeight: 1.7, margin: "0 0 14px" }}>
        在籍者は「入会日時」を利用開始日として集計しています。「最終カウンセリング日」は、予約一覧CSVのカウンセリング系予約でチェックインした最新受講日です。無料スタジオレッスン等の最終受講日は含みません。
      </p>
    </div>

    <div className="f4h-card" style={{ padding: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center", flexWrap: "wrap", marginBottom: 12 }}>
        <div>
          <div style={{ fontWeight: 800, fontSize: 14 }}>対応対象者リスト</div>
          <div style={{ fontSize: 12, color: "var(--ink-faint)", marginTop: 3 }}>誰に次のカウンセリング案内が必要かを確認できます。</div>
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {listTabs.map((tab) => (
            <Pill key={tab.key} active={listMode === tab.key} onClick={() => setListMode(tab.key)}>
              {tab.label}（{counselingActionListRows(filteredRows, tab.key).length}）
            </Pill>
          ))}
        </div>
      </div>
      {actionRows.length === 0 ? (
        <EmptyState title="該当者はいません" sub="条件を切り替えるか、期間・店舗フィルターを変更してください。" />
      ) : (
        <CounselingActionListTable rows={actionRows} />
      )}
    </div>

    <div className="f4h-card" style={{ padding: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center", flexWrap: "wrap", marginBottom: 12 }}>
        <div>
          <div style={{ fontWeight: 800, fontSize: 14 }}>退会予定者かつカウンセリング3回未満</div>
          <div style={{ fontSize: 12, color: "var(--ink-faint)", marginTop: 3 }}>退会予定者のうち、初回から3回目までのフォローが不足している人です。</div>
        </div>
        <CounselingStatLine label="対象" value={`${retiringUnder3Rows.length}人`} />
      </div>
      {retiringUnder3Rows.length === 0 ? (
        <EmptyState title="該当者はいません" sub="退会予定かつ3回未満の在籍者はありません。" />
      ) : (
        <CounselingActionListTable rows={retiringUnder3Rows} mode="retiring" />
      )}
    </div>

    <CounselingInitialBreakdown rows={filteredRows} />

    <div className="f4h-card" style={{ padding: 18 }}>
      <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 10 }}>在籍者全体の明細</div>
      {filteredRows.length === 0 ? (
        <EmptyState title="在籍者データがありません" sub="メンバー一覧（契約中）CSVを取り込むと、予約一覧CSVとメンバーIDで突合して表示します。" />
      ) : (
        <div className="scrollbar-thin" style={{ overflow: "auto", border: "1px solid var(--border-soft)", borderRadius: 8 }}>
          <table className="f4h-table">
            <thead>
              <tr>
                <th>メンバーID</th><th>氏名</th><th>店舗</th><th>ステータス区分</th><th>利用開始日</th><th>利用開始月</th>
                <th>受講済み到達段階</th><th>予約込み到達段階</th><th>最終カウンセリング日</th><th>次回必要カウンセリング</th>
                <th>初回カウンセリング日</th><th>2回目カウンセリング日</th><th>3回目カウンセリング日</th><th>4回目以降カウンセリング日</th>
                <th>最終カウンセリング名</th><th>最終カウンセリング開始時刻</th><th>最終カウンセリング担当スタッフ</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((row) => (
                <tr key={row.memberId} style={row.statusCategory === "退会予定" ? { background: "var(--amber-soft)" } : undefined}>
                  <td>{row.memberId}</td>
                  <td style={{ textAlign: "left" }}>{row.name || "—"}</td>
                  <td style={{ textAlign: "left" }}>{row.store || "—"}</td>
                  <td>{row.statusCategory}</td>
                  <td>{row.startDate || "—"}</td>
                  <td>{row.startMonth || "—"}</td>
                  <td>{counselingStageLabel(row.checkedStage)}</td>
                  <td>{counselingStageLabel(row.reservedStage)}</td>
                  <td>{row.finalCounselingDate || "—"}</td>
                  <td style={{ textAlign: "left" }}>{row.nextCounseling}</td>
                  <td>{row.firstCounselingDate || "—"}</td>
                  <td>{row.secondCounselingDate || "—"}</td>
                  <td>{row.thirdCounselingDate || "—"}</td>
                  <td>{row.fourthPlusCounselingDate || "—"}</td>
                  <td style={{ textAlign: "left" }}>{row.finalCounselingName || "—"}</td>
                  <td>{row.finalCounselingStartTime || "—"}</td>
                  <td style={{ textAlign: "left" }}>{row.finalCounselingStaffName || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </div>
  );
}

function addMonthsToYearMonth(year, month, delta) {
  const d = new Date(year, month - 1 + delta, 1);
  return { year: d.getFullYear(), month: d.getMonth() + 1, ym: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}` };
}
function newMemberPeriodRange(mode, customStart, customEnd) {
  const now = new Date();
  const current = { year: now.getFullYear(), month: now.getMonth() + 1 };
  if (mode === "all") return { start: null, end: null, label: "全期間" };
  if (mode === "current") {
    const ym = `${current.year}-${String(current.month).padStart(2, "0")}`;
    return { start: `${ym}-01`, end: `${ym}-31`, label: "当月" };
  }
  if (mode === "previous") {
    const p = addMonthsToYearMonth(current.year, current.month, -1);
    return { start: `${p.ym}-01`, end: `${p.ym}-31`, label: "前月" };
  }
  if (mode === "last3") {
    const p = addMonthsToYearMonth(current.year, current.month, -2);
    const ym = `${current.year}-${String(current.month).padStart(2, "0")}`;
    return { start: `${p.ym}-01`, end: `${ym}-31`, label: "直近3ヶ月" };
  }
  if (mode === "last6") {
    const p = addMonthsToYearMonth(current.year, current.month, -5);
    const ym = `${current.year}-${String(current.month).padStart(2, "0")}`;
    return { start: `${p.ym}-01`, end: `${ym}-31`, label: "直近6ヶ月" };
  }
  return { start: customStart || null, end: customEnd || null, label: "期間指定" };
}
function isInDateRange(dateStr, range) {
  if (!dateStr) return !range.start && !range.end;
  if (range.start && dateStr < range.start) return false;
  if (range.end && dateStr > range.end) return false;
  return true;
}

function NewMemberCounselingProgressSection({ data }) {
  const [storeFilter, setStoreFilter] = useState("all");
  const [periodMode, setPeriodMode] = useState("all");
  const [customStartYm, setCustomStartYm] = useState(counselingCurrentYm());
  const [customEndYm, setCustomEndYm] = useState(counselingCurrentYm());
  const period = useMemo(() => counselingPeriodFromMode(periodMode, customStartYm, customEndYm), [periodMode, customStartYm, customEndYm]);
  const progressRows = useMemo(
    () => buildNewMemberCounselingProgress(data.counselingNewMembers, data.counselingReservations),
    [data.counselingNewMembers, data.counselingReservations]
  );
  const filteredRows = useMemo(() => progressRows.filter((row) => {
    if (storeFilter !== "all" && row.store !== storeFilter) return false;
    return counselingYmInPeriod(row.startMonth, period);
  }), [progressRows, storeFilter, period]);
  const total = filteredRows.length;
  const stageCounts = [0, 1, 2, 3, 4].map((stage) => (
    stage === 4 ? filteredRows.filter((row) => row.checkedStage >= 4).length : filteredRows.filter((row) => row.checkedStage === stage).length
  ));
  const reached3 = filteredRows.filter((row) => row.checkedStage >= 3).length;
  const under3 = filteredRows.filter((row) => row.checkedStage < 3).length;
  const under4 = filteredRows.filter((row) => row.checkedStage < 4).length;

  return (
    <div className="f4h-card" style={{ padding: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start", flexWrap: "wrap", marginBottom: 14 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 800, color: "var(--ink-faint)", letterSpacing: ".05em", marginBottom: 4 }}>新規入会者分析</div>
          <div style={{ fontSize: 20, fontWeight: 800 }}>新規入会者のカウンセリング進捗</div>
          <div style={{ marginTop: 4, fontSize: 12.5, color: "var(--ink-faint)" }}>利用開始月で絞り込み中：{period.label}</div>
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <Pill active={storeFilter === "all"} onClick={() => setStoreFilter("all")}>全店</Pill>
          {STORE_KEYS.map((store) => (
            <Pill key={store} active={storeFilter === store} onClick={() => setStoreFilter(store)}>{store}</Pill>
          ))}
        </div>
      </div>

      <CounselingPeriodFilter
        periodMode={periodMode}
        setPeriodMode={setPeriodMode}
        customStartYm={customStartYm}
        setCustomStartYm={setCustomStartYm}
        customEndYm={customEndYm}
        setCustomEndYm={setCustomEndYm}
        basisLabel="利用開始月"
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(132px, 1fr))", gap: 10, marginBottom: 14 }}>
        <CounselingKpiCard label="新規入会者数" value={`${num(total)}人`} sub={period.label} />
        <CounselingKpiCard label="初回未実施" value={`${num(stageCounts[0])}人`} sub="0回" />
        <CounselingKpiCard label="初回済み" value={`${num(stageCounts[1])}人`} sub="1回" />
        <CounselingKpiCard label="2回目済み" value={`${num(stageCounts[2])}人`} sub="2回" />
        <CounselingKpiCard label="3回目済み" value={`${num(stageCounts[3])}人`} sub="3回" />
        <CounselingKpiCard label="4回目以降済み" value={`${num(stageCounts[4])}人`} sub="4回目以降" />
        <CounselingKpiCard label="3回目到達率" value={total ? pct1(reached3 / total) : "—"} />
        <CounselingKpiCard label="3回未満人数" value={`${num(under3)}人`} />
        <CounselingKpiCard label="4回目以降未到達人数" value={`${num(under4)}人`} />
      </div>

      <CounselingDefinitionNote />

      <p style={{ fontSize: 12.5, color: "var(--ink-faint)", lineHeight: 1.7, margin: "0 0 14px" }}>
        新規入会者は「プラン契約適用開始日」を利用開始日として集計しています。プラン契約適用開始日が空欄の場合のみ「入会日時」を代替利用します。「最終カウンセリング日」は、予約一覧CSVのカウンセリング系予約でチェックインした最新受講日です。無料スタジオレッスン等の最終受講日は含みません。
      </p>

      {filteredRows.length === 0 ? (
        <EmptyState title="新規入会者データがありません" sub="メンバー一覧（新規入会）CSVを取り込むと、予約一覧CSVとメンバーIDで突合して表示します。" />
      ) : (
        <div className="scrollbar-thin" style={{ overflow: "auto", border: "1px solid var(--border-soft)", borderRadius: 8 }}>
          <table className="f4h-table">
            <thead>
              <tr>
                <th>メンバーID</th><th>氏名</th><th>店舗</th><th>利用開始日</th><th>利用開始月</th><th>入会日時</th>
                <th>受講済み到達段階</th><th>予約込み到達段階</th><th>最終カウンセリング日</th><th>次回必要カウンセリング</th>
                <th>初回カウンセリング日</th><th>2回目カウンセリング日</th><th>3回目カウンセリング日</th><th>4回目以降カウンセリング日</th>
                <th>最終カウンセリング名</th><th>最終カウンセリング開始時刻</th><th>最終カウンセリング担当スタッフ</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((row) => (
                <tr key={row.memberId}>
                  <td>{row.memberId}</td>
                  <td style={{ textAlign: "left" }}>{row.name || "—"}</td>
                  <td style={{ textAlign: "left" }}>{row.store || "—"}</td>
                  <td>{row.startDate || "—"}</td>
                  <td>{row.startMonth || "—"}</td>
                  <td>{row.joinDate || "—"}</td>
                  <td>{counselingStageLabel(row.checkedStage)}</td>
                  <td>{counselingStageLabel(row.reservedStage)}</td>
                  <td>{row.finalCounselingDate || "—"}</td>
                  <td style={{ textAlign: "left" }}>{row.nextCounseling}</td>
                  <td>{row.firstCounselingDate || "—"}</td>
                  <td>{row.secondCounselingDate || "—"}</td>
                  <td>{row.thirdCounselingDate || "—"}</td>
                  <td>{row.fourthPlusCounselingDate || "—"}</td>
                  <td style={{ textAlign: "left" }}>{row.finalCounselingName || "—"}</td>
                  <td>{row.finalCounselingStartTime || "—"}</td>
                  <td style={{ textAlign: "left" }}>{row.finalCounselingStaffName || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function CancelMemberCounselingProgressSection({ data }) {
  const [storeFilter, setStoreFilter] = useState("all");
  const [periodMode, setPeriodMode] = useState("all");
  const [customStartYm, setCustomStartYm] = useState(counselingCurrentYm());
  const [customEndYm, setCustomEndYm] = useState(counselingCurrentYm());
  const period = useMemo(() => counselingPeriodFromMode(periodMode, customStartYm, customEndYm), [periodMode, customStartYm, customEndYm]);
  const progressRows = useMemo(
    () => buildCancelMemberCounselingProgress(data.counselingCancelMembers, data.counselingReservations),
    [data.counselingCancelMembers, data.counselingReservations]
  );
  const filteredRows = useMemo(() => progressRows.filter((row) => {
    if (storeFilter !== "all" && row.store !== storeFilter) return false;
    return counselingYmInPeriod(row.cancelMonth, period);
  }), [progressRows, storeFilter, period]);
  const total = filteredRows.length;
  const stageCounts = [0, 1, 2, 3, 4].map((stage) => (
    stage === 4 ? filteredRows.filter((row) => row.checkedStage >= 4).length : filteredRows.filter((row) => row.checkedStage === stage).length
  ));
  const reached3 = filteredRows.filter((row) => row.checkedStage >= 3).length;
  const under3 = filteredRows.filter((row) => row.checkedStage < 3).length;
  const under4 = filteredRows.filter((row) => row.checkedStage < 4).length;

  return (
    <div className="f4h-card" style={{ padding: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start", flexWrap: "wrap", marginBottom: 14 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 800, color: "var(--ink-faint)", letterSpacing: ".05em", marginBottom: 4 }}>退会者分析</div>
          <div style={{ fontSize: 20, fontWeight: 800 }}>退会者のカウンセリング進捗</div>
          <div style={{ marginTop: 4, fontSize: 12.5, color: "var(--ink-faint)" }}>退会月で絞り込み中：{period.label}</div>
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <Pill active={storeFilter === "all"} onClick={() => setStoreFilter("all")}>全店</Pill>
          {STORE_KEYS.map((store) => (
            <Pill key={store} active={storeFilter === store} onClick={() => setStoreFilter(store)}>{store}</Pill>
          ))}
        </div>
      </div>

      <CounselingPeriodFilter
        periodMode={periodMode}
        setPeriodMode={setPeriodMode}
        customStartYm={customStartYm}
        setCustomStartYm={setCustomStartYm}
        customEndYm={customEndYm}
        setCustomEndYm={setCustomEndYm}
        basisLabel="退会月"
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(132px, 1fr))", gap: 10, marginBottom: 14 }}>
        <CounselingKpiCard label="退会者数" value={`${num(total)}人`} sub={period.label} />
        <CounselingKpiCard label="初回未実施" value={`${num(stageCounts[0])}人`} sub="0回" />
        <CounselingKpiCard label="初回済み" value={`${num(stageCounts[1])}人`} sub="1回" />
        <CounselingKpiCard label="2回目済み" value={`${num(stageCounts[2])}人`} sub="2回" />
        <CounselingKpiCard label="3回目済み" value={`${num(stageCounts[3])}人`} sub="3回" />
        <CounselingKpiCard label="4回目以降済み" value={`${num(stageCounts[4])}人`} sub="4回目以降" />
        <CounselingKpiCard label="3回目到達率" value={total ? pct1(reached3 / total) : "—"} />
        <CounselingKpiCard label="3回未満人数" value={`${num(under3)}人`} />
        <CounselingKpiCard label="4回目以降未到達人数" value={`${num(under4)}人`} />
      </div>

      <CounselingDefinitionNote />

      <p style={{ fontSize: 12.5, color: "var(--ink-faint)", lineHeight: 1.7, margin: "0 0 14px" }}>
        退会者は「プラン契約適用終了日」を退会月として集計しています。利用開始日は、同じメンバーIDが新規入会CSVに存在する場合は新規入会CSVの利用開始日を優先し、存在しない場合は退会CSVの「入会日時」を使います。退会CSVの「プラン契約適用開始日」は、プラン変更などで更新される可能性があるため利用開始日には使いません。「最終カウンセリング日」は、予約一覧CSVのカウンセリング系予約でチェックインした最新受講日です。無料スタジオレッスン等の最終受講日は含みません。
      </p>

      {filteredRows.length === 0 ? (
        <EmptyState title="退会者データがありません" sub="メンバー一覧（退会）CSVを取り込むと、予約一覧CSVとメンバーIDで突合して表示します。" />
      ) : (
        <div className="scrollbar-thin" style={{ overflow: "auto", border: "1px solid var(--border-soft)", borderRadius: 8 }}>
          <table className="f4h-table">
            <thead>
              <tr>
                <th>メンバーID</th><th>氏名</th><th>店舗</th><th>退会月</th><th>プラン契約適用終了日</th><th>利用開始日</th><th>利用開始月</th><th>入会日時</th>
                <th>受講済み到達段階</th><th>予約込み到達段階</th><th>最終カウンセリング日</th><th>次回必要カウンセリング</th>
                <th>初回カウンセリング日</th><th>2回目カウンセリング日</th><th>3回目カウンセリング日</th><th>4回目以降カウンセリング日</th>
                <th>最終カウンセリング名</th><th>最終カウンセリング開始時刻</th><th>最終カウンセリング担当スタッフ</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((row) => (
                <tr key={row.memberId}>
                  <td>{row.memberId}</td>
                  <td style={{ textAlign: "left" }}>{row.name || "—"}</td>
                  <td style={{ textAlign: "left" }}>{row.store || "—"}</td>
                  <td>{row.cancelMonth || "—"}</td>
                  <td>{row.planEndDate || "—"}</td>
                  <td>{row.startDate || "—"}</td>
                  <td>{row.startMonth || "—"}</td>
                  <td>{row.joinDate || "—"}</td>
                  <td>{counselingStageLabel(row.checkedStage)}</td>
                  <td>{counselingStageLabel(row.reservedStage)}</td>
                  <td>{row.finalCounselingDate || "—"}</td>
                  <td style={{ textAlign: "left" }}>{row.nextCounseling}</td>
                  <td>{row.firstCounselingDate || "—"}</td>
                  <td>{row.secondCounselingDate || "—"}</td>
                  <td>{row.thirdCounselingDate || "—"}</td>
                  <td>{row.fourthPlusCounselingDate || "—"}</td>
                  <td style={{ textAlign: "left" }}>{row.finalCounselingName || "—"}</td>
                  <td>{row.finalCounselingStartTime || "—"}</td>
                  <td style={{ textAlign: "left" }}>{row.finalCounselingStaffName || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function CounselingAnalysisView({ data, updateData, showToast, onNavigate }) {
  const [csvText, setCsvText] = useState("");
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState("");
  const fileRef = useRef(null);
  const reservations = normalizeCounselingReservations(data.counselingReservations);
  const meta = normalizeCounselingMeta(data.counselingMeta);
  const monthCounts = monthlyCounselingCounts(reservations);
  const [openImports, setOpenImports] = useState({
    reservations: true,
    activeMembers: false,
    newMembers: false,
    cancelMembers: false,
  });
  const [analysisTab, setAnalysisTab] = useState("activeMembers");
  const toggleImportSection = (key) => setOpenImports((state) => ({ ...state, [key]: !state[key] }));

  const reset = () => {
    setCsvText("");
    setPreview(null);
    setFileName("");
    if (fileRef.current) fileRef.current.value = "";
  };

  const doParse = useCallback((text, name = "") => {
    const clean = text.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
    Papa.parse(clean, {
      header: true,
      skipEmptyLines: true,
      complete: (res) => {
        const rawRows = res.data || [];
        const parsed = parseCounselingRows(rawRows);
        const missingRequiredHeaders = missingCounselingReservationHeaders(res.meta?.fields || []);
        setPreview({
          rows: parsed.rows,
          stats: { ...parsed.stats, missingRequiredHeaders },
          filename: name || "貼り付けCSV",
        });
      },
      error: () => showToast("CSVの解析に失敗しました。", true),
    });
  }, [showToast]);

  const onFile = useCallback((e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFileName(f.name);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target.result;
      setCsvText(text);
      doParse(text, f.name);
    };
    reader.onerror = () => showToast("ファイルの読み込みに失敗しました。", true);
    reader.readAsText(f, "UTF-8");
  }, [doParse, showToast]);

  const onParseText = useCallback(() => {
    if (csvText.trim()) doParse(csvText, fileName);
  }, [csvText, doParse, fileName]);

  const handleImport = async () => {
    if (!preview) {
      showToast("CSVを読み込んでください。", true);
      return;
    }
    if (!preview.rows.length) {
      showToast("保存対象のカウンセリング予約がありません。", true);
      return;
    }
    const importedAt = new Date().toISOString();
    const source = {
      importedAt,
      filename: preview.filename,
      ...preview.stats,
    };
    await updateData("counselingReservations", (cur) => mergeCounselingReservations(cur, preview.rows));
    await updateData("counselingMeta", () => source);
    showToast(`カウンセリング予約 ${preview.rows.length}件を保存しました`);
    reset();
  };

  const StatLine = ({ label, value }) => (
    <span>{label} <b className="num">{value}</b></span>
  );
  const activeMembers = normalizeCounselingActiveMembers(data.counselingActiveMembers);
  const activeMembersMeta = normalizeCounselingActiveMembersMeta(data.counselingActiveMembers);
  const newMembers = normalizeCounselingNewMembers(data.counselingNewMembers);
  const newMembersMeta = normalizeCounselingNewMembersMeta(data.counselingNewMembers);
  const cancelMembers = normalizeCounselingCancelMembers(data.counselingCancelMembers);
  const cancelMembersMeta = normalizeCounselingCancelMembersMeta(data.counselingCancelMembers);
  const reservationStageCounts = counselingReservationStageCounts(reservations);
  const metaTime = (value) => value ? new Date(value).toLocaleString("ja-JP") : "—";

  return (
    <div className="f4h-fade-in" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <SectionHeading eyebrow="カウンセリング分析" title="カウンセリング分析" />

      <div className="f4h-card" style={{ padding: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 14, alignItems: "flex-start", flexWrap: "wrap" }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 6 }}>保存状況</div>
            <p style={{ fontSize: 12.5, color: "var(--ink-faint)", margin: 0, lineHeight: 1.7 }}>
              カウンセリング分析用CSVの取込は「データ入力」タブの「カウンセリング分析用データ」から行ってください。
            </p>
          </div>
          <button type="button" className="f4h-btn f4h-btn-primary f4h-focus" style={{ padding: "8px 14px" }} onClick={() => onNavigate?.("entry")}>
            データ入力へ移動
          </button>
        </div>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", fontSize: 12.5, color: "var(--ink-soft)", marginTop: 14 }}>
          <CounselingStatLine label="予約データ" value={`${reservations.length}件`} />
          <CounselingStatLine label="初回カウンセリング" value={`${reservationStageCounts[1]}件`} />
          <CounselingStatLine label="2回目カウンセリング" value={`${reservationStageCounts[2]}件`} />
          <CounselingStatLine label="3回目カウンセリング" value={`${reservationStageCounts[3]}件`} />
          <CounselingStatLine label="4回目以降カウンセリング" value={`${reservationStageCounts[4]}件`} />
          <CounselingStatLine label="在籍者データ" value={`${activeMembers.length}件`} />
          <CounselingStatLine label="新規入会者データ" value={`${newMembers.length}件`} />
          <CounselingStatLine label="退会者データ" value={`${cancelMembers.length}件`} />
        </div>
        <div style={{ marginTop: 8, display: "flex", gap: 14, flexWrap: "wrap", fontSize: 12, color: "var(--ink-faint)" }}>
          <span>予約 最終取込: {metaTime(meta.importedAt)}</span>
          <span>在籍者 最終取込: {metaTime(activeMembersMeta.importedAt)}</span>
          <span>新規入会者 最終取込: {metaTime(newMembersMeta.importedAt || newMembersMeta.lastImportedAt)}</span>
          <span>退会者 最終取込: {metaTime(cancelMembersMeta.importedAt || cancelMembersMeta.lastImportedAt)}</span>
        </div>
      </div>

      <div style={{ display: "none" }} aria-hidden="true">
      <CounselingCollapsibleSection
        title="予約一覧CSV取込"
        sub="固定枠・自由枠の予約一覧CSVを取り込み、カウンセリング予約として保存します"
        open={openImports.reservations}
        onToggle={() => toggleImportSection("reservations")}
      >
      <div className="f4h-card" style={{ padding: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <Upload size={16} /><div style={{ fontWeight: 700, fontSize: 14 }}>hacomono「予約一覧」CSVを取り込む</div>
        </div>
        <p style={{ fontSize: 12.5, color: "var(--ink-faint)", margin: "2px 0 14px", lineHeight: 1.7 }}>
          固定枠：予約一覧CSV、自由枠：予約一覧CSVのどちらにも対応しています。ファイル名ではなくCSVヘッダー名で必要項目を取得します。使用チケットが「初回カウンセリング」「２回目カウンセリング」「３回目カウンセリング」「４回目以降カウンセリング」の予約だけを保存します。
        </p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 10 }}>
          <button className="f4h-btn f4h-btn-outline f4h-focus" style={{ padding: "8px 14px" }} onClick={() => fileRef.current?.click()}>
            <Upload size={14} /> CSVファイルを選択
          </button>
          <input ref={fileRef} type="file" accept=".csv,text/csv" style={{ display: "none" }} onChange={onFile} />
          <span style={{ fontSize: 12, color: "var(--ink-faint)", alignSelf: "center" }}>または下に貼り付け</span>
        </div>
        <textarea className="f4h-input" rows={4} placeholder="CSVの内容をここに貼り付け..."
          style={{ resize: "vertical", fontFamily: "monospace", fontSize: 12 }}
          value={csvText} onChange={(e) => setCsvText(e.target.value)} />
        <div style={{ marginTop: 8, display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          <button className="f4h-btn f4h-btn-primary f4h-focus" style={{ padding: "8px 16px" }} onClick={onParseText} disabled={!csvText.trim()}>
            読み込む
          </button>
          <button className="f4h-btn f4h-btn-outline f4h-focus" style={{ padding: "8px 14px" }} disabled={!csvText && !preview} onClick={reset}>
            <X size={13} /> リセット
          </button>
        </div>

        {preview && (
          <div className="f4h-fade-in" style={{ marginTop: 18, borderTop: "1px solid var(--border-soft)", paddingTop: 16 }}>
            <div style={{ display: "flex", gap: 14, fontSize: 12.5, color: "var(--ink-soft)", marginBottom: 8, flexWrap: "wrap" }}>
              <StatLine label="今回取込の総行数" value={`${preview.stats.rowCount}件`} />
              <StatLine label="有効件数" value={`${preview.stats.validCount}件`} />
              <StatLine label="対象外件数" value={`${preview.stats.excludedCount}件`} />
              <StatLine label="メンバーID空欄除外" value={`${preview.stats.blankMemberIdCount}件`} />
              <StatLine label="対象外チケット除外" value={`${preview.stats.ticketExcludedCount}件`} />
              <StatLine label="受講日不明除外" value={`${preview.stats.unknownDateCount}件`} />
              <span>ファイル <b>{preview.filename}</b></span>
            </div>
            {preview.stats.missingRequiredHeaders?.length > 0 && (
              <div style={{ display: "flex", gap: 6, alignItems: "center", color: "var(--red)", fontSize: 12.5, marginBottom: 10 }}>
                <AlertTriangle size={14} /> 必須列が見つかりません: {preview.stats.missingRequiredHeaders.join(" / ")}
              </div>
            )}
            {preview.rows.length === 0 ? (
              <div style={{ display: "flex", gap: 6, alignItems: "center", color: "var(--red)", fontSize: 12.5, marginBottom: 10 }}>
                <AlertTriangle size={14} /> 保存対象のカウンセリング予約が見つかりません。
              </div>
            ) : (
              <>
                <div className="scrollbar-thin" style={{ maxHeight: 220, overflow: "auto", border: "1px solid var(--border-soft)", borderRadius: 8, marginBottom: 12 }}>
                  <table className="f4h-table">
                    <thead><tr><th>受講日</th><th>店舗</th><th>使用チケット</th><th>メンバーID</th><th>氏名</th><th>開始</th><th>スタッフ</th></tr></thead>
                    <tbody>
                      {preview.rows.slice(0, 50).map((r) => (
                        <tr key={counselingReservationKey(r)}>
                          <td>{r.lessonDate || "—"}</td>
                          <td style={{ textAlign: "left" }}>{r.store || "—"}</td>
                          <td style={{ textAlign: "left" }}>{r.ticket || "—"}</td>
                          <td>{r.memberId}</td>
                          <td style={{ textAlign: "left" }}>{r.name || "—"}</td>
                          <td>{r.startTime || "—"}</td>
                          <td style={{ textAlign: "left" }}>{r.staffName || "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button className="f4h-btn f4h-btn-primary f4h-focus" style={{ padding: "9px 18px" }} onClick={handleImport}>
                  <Check size={15} /> カウンセリング予約 {preview.rows.length}件を保存する
                </button>
              </>
            )}
          </div>
        )}
      </div>

      <div className="f4h-card" style={{ padding: 18 }}>
        <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 10 }}>保存状況</div>
        <div style={{ display: "flex", gap: 18, flexWrap: "wrap", fontSize: 12.5, color: "var(--ink-soft)" }}>
          <StatLine label="保存済み予約データ 合計" value={`${reservations.length}件`} />
          <span>最終取込日時 <b>{meta.importedAt ? new Date(meta.importedAt).toLocaleString("ja-JP") : "—"}</b></span>
          <span>直近取込ファイル名 <b>{meta.filename || "—"}</b></span>
          <StatLine label="今回取込の総行数" value={`${meta.rowCount || 0}件`} />
          <StatLine label="有効件数" value={`${meta.validCount || 0}件`} />
          <StatLine label="対象外件数" value={`${meta.excludedCount || 0}件`} />
          <StatLine label="メンバーID空欄除外" value={`${meta.blankMemberIdCount || 0}件`} />
          <StatLine label="対象外チケット除外" value={`${meta.ticketExcludedCount || 0}件`} />
          <StatLine label="受講日不明除外" value={`${meta.unknownDateCount || 0}件`} />
        </div>
        <div style={{ marginTop: 12, display: "grid", gap: 6 }}>
          <div style={{ fontSize: 12, color: "var(--ink-soft)", fontWeight: 700 }}>登録済み月</div>
          {monthCounts.length === 0 ? (
            <div style={{ fontSize: 12, color: "var(--ink-faint)" }}>—</div>
          ) : (
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {monthCounts.map((item) => (
                <span key={item.ym} style={{ border: "1px solid var(--border-soft)", borderRadius: 999, padding: "5px 10px", background: "var(--surface-soft)", fontSize: 12 }}>
                  {counselingMonthLabel(item.ym)} <b className="num">{item.count}</b>件
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      </CounselingCollapsibleSection>

      <CounselingCollapsibleSection
        title="在籍者CSV取込"
        sub="メンバー一覧（契約中）CSVを保存します"
        open={openImports.activeMembers}
        onToggle={() => toggleImportSection("activeMembers")}
      >
        <ActiveMemberImportPanel data={data} updateData={updateData} showToast={showToast} />
      </CounselingCollapsibleSection>

      <CounselingCollapsibleSection
        title="新規入会者データの保存状況・削除"
        sub="新規入会者CSVは入会者データタブから取り込みます"
        open={openImports.newMembers}
        onToggle={() => toggleImportSection("newMembers")}
      >
        <NewMemberImportPanel data={data} updateData={updateData} showToast={showToast} />
      </CounselingCollapsibleSection>

      <CounselingCollapsibleSection
        title="退会者CSV取込"
        sub="メンバー一覧（退会）CSVを保存します"
        open={openImports.cancelMembers}
        onToggle={() => toggleImportSection("cancelMembers")}
      >
        <CancelMemberImportPanel data={data} updateData={updateData} showToast={showToast} />
      </CounselingCollapsibleSection>
      </div>

      <section style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: "var(--ink-faint)", letterSpacing: ".05em", marginBottom: 4 }}>分析</div>
            <div style={{ fontSize: 20, fontWeight: 800 }}>カウンセリング進捗</div>
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            <Pill active={analysisTab === "activeMembers"} onClick={() => setAnalysisTab("activeMembers")}>在籍者</Pill>
            <Pill active={analysisTab === "newMembers"} onClick={() => setAnalysisTab("newMembers")}>新規入会者</Pill>
            <Pill active={analysisTab === "cancelMembers"} onClick={() => setAnalysisTab("cancelMembers")}>退会者</Pill>
          </div>
        </div>
        {analysisTab === "activeMembers" && <ActiveCounselingProgressSection data={data} />}
        {analysisTab === "newMembers" && <NewMemberCounselingProgressSection data={data} />}
        {analysisTab === "cancelMembers" && <CancelMemberCounselingProgressSection data={data} />}
      </section>
    </div>
  );
}

// ============================================================
// CVR分析（店舗別・担当者別）
// ============================================================
function periodMonths(year, granularity, month) {
  if (granularity === "month") return [{ year, month }];
  if (granularity === "h1") return monthsOfHalf(year, 1);
  if (granularity === "h2") return monthsOfHalf(year, 2);
  return monthsOfYear(year);
}
function periodLabel(year, granularity, month) {
  if (granularity === "month") return `${year}年${month}月`;
  if (granularity === "h1") return `${year}年 上期（1〜6月）`;
  if (granularity === "h2") return `${year}年 下期（7〜12月）`;
  return `${year}年 年間`;
}

function CvrTable({ rows, targetCvrPct, highlightTotal = true }) {
  return (
    <div className="scrollbar-thin" style={{ overflow: "auto" }}>
      <table className="f4h-table">
        <thead><tr><th>{rows.nameHeader || "名前"}</th><th>体験数</th><th>入会数</th><th>CVR</th></tr></thead>
        <tbody>
          {rows.list.map((r) => (
            <tr key={r.name} style={r.bold ? { fontWeight: 700, background: "var(--surface-soft)" } : undefined}>
              <td style={{ textAlign: "left", display: "flex", alignItems: "center", gap: 6 }}>
                {r.color && <span style={{ width: 8, height: 8, borderRadius: 99, background: r.color, display: "inline-block" }} />}
                {r.name}
              </td>
              <td className="num">{num(r.trialCount)}</td>
              <td className="num">{num(r.joinCount)}</td>
              <td>
                <span className={"f4h-tone-" + cvrTone(r.cvr, targetCvrPct) + " num"} style={{ borderRadius: 6, padding: "2px 9px", fontWeight: 700, display: "inline-block", minWidth: 56 }}>
                  {pct1(r.cvr)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CvrAnalysisView({ data }) {
  const today = useMemo(() => todayParts(), []);
  const asOfNow = today.date;
  const [tab, setTab] = useState("store");
  const [year, setYear] = useState(today.year);
  const [granularity, setGranularity] = useState("month");
  const [month, setMonth] = useState(today.month);

  const months = periodMonths(year, granularity, month);
  const targetCvrPct = data.settings.targetCvrPct;

  const storeRows = useMemo(() => {
    const list = STORE_DEFS.map((s) => {
      const agg = aggregateTrialPeriod(data.trials, { store: s.key, months, asOf: asOfNow, joins: data.joins });
      return { name: s.key, color: s.color, ...agg };
    });
    const totalAgg = aggregateTrialPeriod(data.trials, { months, asOf: asOfNow, joins: data.joins });
    list.push({ name: "全店合計", bold: true, ...totalAgg });
    return { list, nameHeader: "店舗" };
  }, [data.trials, data.joins, months, asOfNow]);

  const staffRows = useMemo(() => {
    const sorted = [...data.staff].map((s) => {
      const agg = aggregateTrialPeriod(data.trials, { staff: s.name, months, asOf: asOfNow, joins: data.joins });
      return { name: s.name, ...agg };
    }).filter((r) => r.trialCount > 0).sort((a, b) => b.trialCount - a.trialCount);
    const zeroStaff = data.staff.filter((s) => !sorted.find((r) => r.name === s.name))
      .map((s) => ({ name: s.name, trialCount: 0, joinCount: 0, cvr: null }));
    const totalAgg = aggregateTrialPeriod(data.trials, { months, asOf: asOfNow, joins: data.joins });
    return { list: [...sorted, ...zeroStaff, { name: "全体", bold: true, ...totalAgg }], nameHeader: "担当者" };
  }, [data.trials, data.staff, data.joins, months, asOfNow]);

  const pendingCount = useMemo(() => countPendingTrials(data.trials, { months, asOf: asOfNow }), [data.trials, months, asOfNow]);
  const optOutCount = useMemo(() => countOptOutTrials(data.trials, { months }), [data.trials, months]);
  const noshowCount = useMemo(() => countNoshowTrials(data.trials, { months }), [data.trials, months]);

  const chartRows = (tab === "store" ? storeRows : staffRows).list.filter((r) => !r.bold && r.trialCount > 0);
  const chartData = chartRows.map((r) => ({ name: r.name, CVR: r.cvr == null ? 0 : Math.round(r.cvr * 1000) / 10 }));

  return (
    <div className="f4h-fade-in" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <SectionHeading eyebrow="CVR分析" title="無料体験 獲得率（CVR）" />
      <SubTabs tabs={[{ key: "store", label: "店舗別" }, { key: "staff", label: "担当者別" }]} active={tab} onChange={setTab} />

      <div className="f4h-card" style={{ padding: 16, display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ display: "flex", gap: 4 }}>
          <Pill active={granularity === "month"} onClick={() => setGranularity("month")}>単月</Pill>
          <Pill active={granularity === "h1"} onClick={() => setGranularity("h1")}>上期</Pill>
          <Pill active={granularity === "h2"} onClick={() => setGranularity("h2")}>下期</Pill>
          <Pill active={granularity === "year"} onClick={() => setGranularity("year")}>年間</Pill>
        </div>
        {granularity === "month" ? (
          <MonthPicker year={year} month={month} onChange={(y, m) => { setYear(y); setMonth(m); }} />
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <button className="f4h-btn f4h-btn-ghost f4h-focus" style={{ padding: 6 }} onClick={() => setYear((y) => y - 1)}><ChevronLeft size={15} /></button>
            <span className="num" style={{ fontWeight: 700 }}>{year}年</span>
            <button className="f4h-btn f4h-btn-ghost f4h-focus" style={{ padding: 6 }} onClick={() => setYear((y) => y + 1)}><ChevronRight size={15} /></button>
          </div>
        )}
        <div style={{ marginLeft: "auto", fontSize: 12, color: "var(--ink-faint)" }}>
          目標CVR <b className="num">{pct1(targetCvrPct)}</b>（設定で変更できます）
        </div>
      </div>

      <div className="f4h-card" style={{ padding: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
          <div style={{ fontWeight: 700, fontSize: 13 }}>{periodLabel(year, granularity, month)}</div>
          <div style={{ fontSize: 11, color: "var(--ink-faint)" }}>
            体験数・CVRは本日（{asOfNow.getMonth() + 1}/{asOfNow.getDate()}）までに実施済みの体験のみで算出
            {pendingCount > 0 && `（今後実施予定の${num(pendingCount)}件は含まれません）`}
            {optOutCount > 0 && `／入会意思なし${num(optOutCount)}件は除外済み`}
            {noshowCount > 0 && `／来店無し${num(noshowCount)}件は除外済み`}
          </div>
        </div>
        <CvrTable rows={tab === "store" ? storeRows : staffRows} targetCvrPct={targetCvrPct} />
      </div>

      {chartData.length > 0 && (
        <div className="f4h-card" style={{ padding: 18 }}>
          <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10 }}>CVRランキング</div>
          <ResponsiveContainer width="100%" height={Math.max(140, chartData.length * 34)}>
            <BarChart data={chartData} layout="vertical" margin={{ left: 10, right: 24 }}>
              <CartesianGrid strokeDasharray="3 5" stroke="#E2E6DC" horizontal={false} />
              <XAxis type="number" domain={[0, "dataMax"]} tickFormatter={(v) => v + "%"} tick={{ fontSize: 10, fill: "var(--ink-faint)" }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" width={88} tick={{ fontSize: 11.5, fill: "var(--ink)" }} axisLine={false} tickLine={false} />
              <Tooltip formatter={(v) => v + "%"} contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid var(--border)" }} />
              <ReferenceLine x={targetCvrPct * 100} stroke="var(--ink-faint)" strokeDasharray="4 3" />
              <Bar dataKey="CVR" radius={[0, 5, 5, 0]} fill="var(--indigo)" maxBarSize={18} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

// ============================================================
// 予実・前年比
// ============================================================
const COMPARE_METRICS = [
  { key: "revenue", label: "売上", unit: "", fmt: yen, invert: false },
  { key: "members", label: "会員数", unit: "人", fmt: num, invert: false },
  { key: "joins", label: "入会数", unit: "人", fmt: num, invert: false },
  { key: "leaves", label: "退会数", unit: "人", fmt: num, invert: true },
  { key: "net", label: "純増数", unit: "人", fmt: num, invert: false },
  { key: "churn", label: "退会率", unit: "", fmt: pct1, invert: true },
];

function metricValue(data, metricKey, storeArg, year, month) {
  const { memberMonthly, baselines, budgetTargets, revenueActuals, settings } = data;
  const mm = getStoreOrAllMemberMonthly(memberMonthly, storeArg, year, month);
  const budget = getBudgetForStore(budgetTargets, storeArg, year, month, settings.targetCvrPct);
  const prior = getPriorMonthTotal(memberMonthly, baselines, storeArg, year, month);
  switch (metricKey) {
    case "revenue": return { actual: getRevenueActual(revenueActuals, storeArg, year, month), target: budget?.revenue ?? null };
    case "members": return { actual: mm?.total ?? null, target: budget?.members ?? null };
    case "joins": return { actual: mm?.joinsTotal ?? null, target: budget?.joins ?? null };
    case "leaves": return { actual: mm?.leaves ?? null, target: budget?.leaves ?? null };
    case "net": return { actual: netIncreaseOf(mm?.joinsTotal, mm?.leaves), target: budget?.netIncrease ?? null };
    case "churn": return { actual: churnRateOf(mm?.leaves, prior), target: settings.churnThresholdPct };
    default: return { actual: null, target: null };
  }
}

function BudgetCompareView({ data }) {
  const today = useMemo(() => todayParts(), []);
  const [store, setStore] = useState("");
  const [year, setYear] = useState(today.year);
  const [metric, setMetric] = useState("members");
  const m = COMPARE_METRICS.find((x) => x.key === metric);

  const rows = useMemo(() => monthsOfYear(year).map(({ month }) => {
    const cur = metricValue(data, metric, store || null, year, month);
    const prior = metricValue(data, metric, store || null, year - 1, month);
    const diff = cur.actual != null && cur.target != null ? cur.actual - cur.target : null;
    const yoy = cur.actual != null && prior.actual != null ? cur.actual - prior.actual : null;
    return { month, target: cur.target, actual: cur.actual, diff, priorActual: prior.actual, yoy };
  }), [data, store, year, metric]);

  const chartData = rows.map((r) => ({
    label: monthLabel(r.month),
    実績: r.actual == null ? null : (metric === "churn" ? Math.round(r.actual * 1000) / 10 : r.actual),
    目標: r.target == null ? null : (metric === "churn" ? Math.round(r.target * 1000) / 10 : r.target),
    前年: r.priorActual == null ? null : (metric === "churn" ? Math.round(r.priorActual * 1000) / 10 : r.priorActual),
  }));

  return (
    <div className="f4h-fade-in" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <SectionHeading eyebrow="予実・前年比" title="目標・実績・前年の比較" />
      <div className="f4h-card" style={{ padding: 16, display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ display: "flex", gap: 4 }}>
          <Pill active={store === ""} onClick={() => setStore("")}>全店</Pill>
          {STORE_DEFS.map((s) => <Pill key={s.key} active={store === s.key} onClick={() => setStore(s.key)}>{s.key}</Pill>)}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <button className="f4h-btn f4h-btn-ghost f4h-focus" style={{ padding: 6 }} onClick={() => setYear((y) => y - 1)}><ChevronLeft size={15} /></button>
          <span className="num" style={{ fontWeight: 700 }}>{year}年</span>
          <button className="f4h-btn f4h-btn-ghost f4h-focus" style={{ padding: 6 }} onClick={() => setYear((y) => y + 1)}><ChevronRight size={15} /></button>
        </div>
        <div className="scrollbar-thin" style={{ display: "flex", gap: 4, overflowX: "auto" }}>
          {COMPARE_METRICS.map((mm2) => <Pill key={mm2.key} active={metric === mm2.key} onClick={() => setMetric(mm2.key)}>{mm2.label}</Pill>)}
        </div>
      </div>

      <div className="f4h-card" style={{ padding: 18 }}>
        <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10 }}>{m.label}の推移（{year}年・{store || "全店"}）</div>
        <ResponsiveContainer width="100%" height={210}>
          <LineChart data={chartData} margin={{ top: 4, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 5" stroke="#E2E6DC" vertical={false} />
            <XAxis dataKey="label" tick={{ fontSize: 10, fill: "var(--ink-faint)" }} axisLine={{ stroke: "#E2E6DC" }} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: "var(--ink-faint)" }} axisLine={false} tickLine={false} width={52}
              tickFormatter={(v) => (Math.abs(v) >= 10000 ? (v / 10000).toLocaleString("ja-JP") + "万" : v.toLocaleString("ja-JP"))} />
            <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid var(--border)" }} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Line type="monotone" dataKey="前年" stroke="#B7BDAE" strokeWidth={1.5} strokeDasharray="4 3" dot={false} connectNulls />
            <Line type="monotone" dataKey="目標" stroke="var(--amber)" strokeWidth={1.5} strokeDasharray="2 2" dot={false} connectNulls />
            <Line type="monotone" dataKey="実績" stroke="var(--indigo)" strokeWidth={2.4} dot={{ r: 2.5 }} connectNulls />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="f4h-card" style={{ padding: 18 }}>
        <div className="scrollbar-thin" style={{ overflow: "auto" }}>
          <table className="f4h-table">
            <thead><tr><th>月</th><th>目標</th><th>実績</th><th>差異</th><th>前年実績</th><th>前年差</th></tr></thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.month}>
                  <td style={{ textAlign: "left", fontWeight: 700 }}>{r.month}月</td>
                  <td className="num">{r.target == null ? "—" : m.fmt(r.target)}</td>
                  <td className="num" style={{ fontWeight: 700 }}>{r.actual == null ? "—" : m.fmt(r.actual)}</td>
                  <td><DeltaTag value={r.diff} invert={m.invert} fmt={m.fmt === pct1 ? pct1 : undefined} /></td>
                  <td className="num">{r.priorActual == null ? "—" : m.fmt(r.priorActual)}</td>
                  <td><DeltaTag value={r.yoy} invert={m.invert} fmt={m.fmt === pct1 ? pct1 : undefined} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// 設定：予算目標
// ============================================================
function BudgetTargetsPanel({ data, updateData, showToast }) {
  const [store, setStore] = useState(STORE_DEFS[0].key);
  const [year, setYear] = useState(todayParts().year);
  const [draft, setDraft] = useState(null);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    const rows = monthsOfYear(year).map(({ month }) => {
      const row = getBudgetRow(data.budgetTargets, store, year, month);
      return row || { store, year, month, revenue: 0, members: 0, joins: 0, leaves: 0 };
    });
    setDraft(rows);
    setDirty(false);
    // eslint-disable-next-line
  }, [store, year, data.budgetTargets]);

  const setCell = (month, field, value) => {
    setDraft((d) => d.map((r) => (r.month === month ? { ...r, [field]: value === "" ? 0 : Number(value) } : r)));
    setDirty(true);
  };

  const handleSave = async () => {
    await updateData("budgetTargets", (cur) => {
      const others = cur.filter((r) => !(r.store === store && r.year === year));
      return [...others, ...draft];
    });
    setDirty(false);
    showToast(`${store}・${year}年度の目標を保存しました`);
  };

  if (!draft) return null;
  const targetCvrPct = data.settings.targetCvrPct;

  return (
    <div className="f4h-card" style={{ padding: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10, marginBottom: 4 }}>
        <div style={{ fontWeight: 700, fontSize: 14 }}>年間予算（目標値）</div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div style={{ display: "flex", gap: 4 }}>
            {STORE_DEFS.map((s) => <Pill key={s.key} active={store === s.key} onClick={() => setStore(s.key)}>{s.key}</Pill>)}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <button className="f4h-btn f4h-btn-ghost f4h-focus" style={{ padding: 5 }} onClick={() => setYear((y) => y - 1)}><ChevronLeft size={14} /></button>
            <span className="num" style={{ fontWeight: 700, fontSize: 13 }}>{year}年</span>
            <button className="f4h-btn f4h-btn-ghost f4h-focus" style={{ padding: 5 }} onClick={() => setYear((y) => y + 1)}><ChevronRight size={14} /></button>
          </div>
        </div>
      </div>
      <p style={{ fontSize: 12, color: "var(--ink-faint)", margin: "2px 0 14px" }}>
        体験目標数は「入会目標 ÷ 目標CVR（{pct1(targetCvrPct)}）を切り上げ」で自動計算されます。目標CVRは下の「一般設定」で変更できます。
      </p>
      <div className="scrollbar-thin" style={{ overflow: "auto" }}>
        <table className="f4h-table">
          <thead><tr><th style={{ textAlign: "left" }}>月</th><th>売上目標</th><th>会員数目標</th><th>入会目標</th><th>退会目標</th><th>体験目標（自動）</th></tr></thead>
          <tbody>
            {draft.map((r) => (
              <tr key={r.month}>
                <td style={{ textAlign: "left", fontWeight: 700 }}>{r.month}月</td>
                {["revenue", "members", "joins", "leaves"].map((f) => (
                  <td key={f}><input type="number" className="f4h-input num" style={{ padding: "4px 6px", textAlign: "right", width: 100 }}
                    value={r[f]} onChange={(e) => setCell(r.month, f, e.target.value)} /></td>
                ))}
                <td className="num" style={{ color: "var(--ink-faint)" }}>{num(deriveTrialTarget(r.joins, targetCvrPct))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: 14 }}>
        <button className="f4h-btn f4h-btn-primary f4h-focus" style={{ padding: "8px 16px" }} onClick={handleSave} disabled={!dirty}>
          <Save size={14} /> {dirty ? "変更を保存" : "保存済み"}
        </button>
      </div>
    </div>
  );
}

// ============================================================
// 設定：スタッフ管理
// ============================================================
function StaffPanel({ data, updateData, showToast }) {
  const [newName, setNewName] = useState("");
  const [delTarget, setDelTarget] = useState(null);

  const addStaff = async () => {
    const name = newName.trim();
    if (!name) return;
    if (data.staff.some((s) => s.name === name)) { showToast("同じ名前のスタッフが既にいます。", true); return; }
    await updateData("staff", (cur) => [...cur, { name, active: true }]);
    setNewName("");
    showToast(`「${name}」を追加しました`);
  };
  const removeStaff = async (name) => {
    await updateData("staff", (cur) => cur.filter((s) => s.name !== name));
    setDelTarget(null);
    showToast("削除しました");
  };
  const move = async (idx, dir) => {
    await updateData("staff", (cur) => {
      const next = [...cur];
      const j = idx + dir;
      if (j < 0 || j >= next.length) return cur;
      [next[idx], next[j]] = [next[j], next[idx]];
      return next;
    });
  };

  const usageCount = (name) => data.trials.filter((t) => t.staff === name).length;

  return (
    <div className="f4h-card" style={{ padding: 18 }}>
      <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>スタッフ名簿</div>
      <p style={{ fontSize: 12, color: "var(--ink-faint)", margin: "2px 0 14px" }}>
        ここで追加・削除するだけで、CVR分析の担当者別表に即座に反映されます（旧マクロ「DB3」の再実行は不要です）。
      </p>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <input className="f4h-input" placeholder="新しいスタッフ名" value={newName} onChange={(e) => setNewName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addStaff()} style={{ maxWidth: 220 }} />
        <button className="f4h-btn f4h-btn-primary f4h-focus" style={{ padding: "8px 14px" }} onClick={addStaff}><Plus size={14} /> 追加</button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {data.staff.map((s, idx) => (
          <div key={s.name} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 10px", borderRadius: 8, background: "var(--surface-soft)" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <button className="f4h-btn f4h-btn-ghost f4h-focus" style={{ padding: 0, height: 12 }} onClick={() => move(idx, -1)} disabled={idx === 0}><ChevronDown size={12} style={{ transform: "rotate(180deg)" }} /></button>
              <button className="f4h-btn f4h-btn-ghost f4h-focus" style={{ padding: 0, height: 12 }} onClick={() => move(idx, 1)} disabled={idx === data.staff.length - 1}><ChevronDown size={12} /></button>
            </div>
            <span style={{ flex: 1, fontWeight: 600, fontSize: 13.5 }}>{s.name}</span>
            <span style={{ fontSize: 11.5, color: "var(--ink-faint)" }}>体験 {usageCount(s.name)}件</span>
            <button className="f4h-btn f4h-btn-ghost f4h-focus" style={{ padding: 5 }} onClick={() => setDelTarget(s.name)}><Trash2 size={14} /></button>
          </div>
        ))}
      </div>
      <ConfirmDialog open={!!delTarget} title={`「${delTarget}」を削除しますか？`}
        message="過去の体験データに記録された担当者名はそのまま残りますが、担当者選択の候補からは消えます。"
        onCancel={() => setDelTarget(null)} onConfirm={() => removeStaff(delTarget)} />
    </div>
  );
}

// ============================================================
// 設定：一般設定・データ管理
// ============================================================
function GeneralSettingsPanel({ data, updateData, showToast }) {
  const [cvr, setCvr] = useState(Math.round(data.settings.targetCvrPct * 1000) / 10);
  const [churn, setChurn] = useState(Math.round(data.settings.churnThresholdPct * 1000) / 10);

  const save = async () => {
    await updateData("settings", (cur) => ({ ...cur, targetCvrPct: cvr / 100, churnThresholdPct: churn / 100 }));
    showToast("一般設定を保存しました");
  };

  return (
    <div className="f4h-card" style={{ padding: 18 }}>
      <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>一般設定</div>
      <p style={{ fontSize: 12, color: "var(--ink-faint)", margin: "2px 0 16px" }}>
        CVR分析の色分け（達成=緑／目標の80%以上=オレンジ／80%未満=赤）と、ダッシュボードの目標CVR・退会率しきい値に使われます。
      </p>
      <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginBottom: 16 }}>
        <div style={{ width: 180 }}>
          <label style={{ fontSize: 11.5, color: "var(--ink-faint)", fontWeight: 700, display: "block", marginBottom: 4 }}>目標CVR（％）</label>
          <input type="number" step="0.1" className="f4h-input num" value={cvr} onChange={(e) => setCvr(Number(e.target.value))} />
        </div>
        <div style={{ width: 180 }}>
          <label style={{ fontSize: 11.5, color: "var(--ink-faint)", fontWeight: 700, display: "block", marginBottom: 4 }}>退会率しきい値（％）</label>
          <input type="number" step="0.1" className="f4h-input num" value={churn} onChange={(e) => setChurn(Number(e.target.value))} />
        </div>
      </div>
      <button className="f4h-btn f4h-btn-primary f4h-focus" style={{ padding: "8px 16px" }} onClick={save}><Save size={14} /> 保存する</button>
    </div>
  );
}

function downloadJson(filename, obj) {
  const blob = new Blob([JSON.stringify(obj, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; document.body.appendChild(a); a.click();
  document.body.removeChild(a); URL.revokeObjectURL(url);
}
function downloadCsv(filename, rows) {
  const csv = Papa.unparse(rows);
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; document.body.appendChild(a); a.click();
  document.body.removeChild(a); URL.revokeObjectURL(url);
}

function AiAssistantSettingsPanel({ data, updateData, showToast }) {
  const [draft, setDraft] = useState(() => normalizeAiAssistantSettings(data.aiAssistantSettings));
  useEffect(() => {
    setDraft(normalizeAiAssistantSettings(data.aiAssistantSettings));
  }, [data.aiAssistantSettings]);
  const setStoreField = (store, key, value) => {
    setDraft((cur) => ({
      ...cur,
      stores: {
        ...cur.stores,
        [store]: { ...(cur.stores?.[store] || {}), [key]: value },
      },
    }));
  };
  const setResourceField = (key, value) => {
    setDraft((cur) => ({ ...cur, monthlyResource: { ...cur.monthlyResource, [key]: value } }));
  };
  const setTemplate = (key, value) => {
    setDraft((cur) => ({ ...cur, templates: { ...cur.templates, [key]: value } }));
  };
  const save = async () => {
    const normalized = normalizeAiAssistantSettings(draft);
    await updateData("aiAssistantSettings", () => normalized);
    showToast("AI分析アシスタント設定を保存しました。");
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div className="f4h-card" style={{ padding: 18, display: "grid", gap: 14 }}>
        <div>
          <div style={{ fontWeight: 800, fontSize: 15 }}>AI分析アシスタント設定</div>
          <div style={{ fontSize: 11.5, color: "var(--ink-faint)", marginTop: 4 }}>外部API送信は行いません。退会分析画面で生成するプロンプトの前提条件だけを保存します。</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12 }}>
          {STORE_KEYS.map((store) => (
            <div key={store} className="f4h-card" style={{ padding: 14, background: "var(--surface-soft)" }}>
              <div style={{ fontWeight: 800, fontSize: 13, marginBottom: 10 }}>{store}</div>
              <div style={{ display: "grid", gap: 8 }}>
                {AI_ASSISTANT_STORE_FIELDS.map(([key, label]) => (
                  <label key={key} style={{ display: "grid", gap: 5, fontSize: 11.5, color: "var(--ink-soft)", fontWeight: 800 }}>
                    {label}
                    {key === "memo" || key === "facilityConstraints" || key === "targetCustomers" ? (
                      <textarea className="f4h-input" value={draft.stores?.[store]?.[key] || ""} onChange={(e) => setStoreField(store, key, e.target.value)} style={{ minHeight: 64, resize: "vertical", fontSize: 12.5 }} />
                    ) : (
                      <input className="f4h-input" value={draft.stores?.[store]?.[key] || ""} onChange={(e) => setStoreField(store, key, e.target.value)} style={{ fontSize: 12.5 }} />
                    )}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="f4h-card" style={{ padding: 18, display: "grid", gap: 12 }}>
        <div style={{ fontWeight: 800, fontSize: 15 }}>今月のリソース・制約</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 10 }}>
          {AI_ASSISTANT_RESOURCE_FIELDS.map(([key, label]) => (
            <label key={key} style={{ display: "grid", gap: 5, fontSize: 11.5, color: "var(--ink-soft)", fontWeight: 800 }}>
              {label}
              <textarea className="f4h-input" value={draft.monthlyResource?.[key] || ""} onChange={(e) => setResourceField(key, e.target.value)} style={{ minHeight: 68, resize: "vertical", fontSize: 12.5 }} />
            </label>
          ))}
        </div>
      </div>

      <div className="f4h-card" style={{ padding: 18, display: "grid", gap: 12 }}>
        <div style={{ fontWeight: 800, fontSize: 15 }}>既定NG条件</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 8 }}>
          {AI_NG_CONDITIONS.map((item) => (
            <label key={item.id} style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 12, color: "var(--ink-soft)", fontWeight: 700 }}>
              <input
                type="checkbox"
                checked={!!draft.ngConditions?.[item.id]}
                onChange={(e) => setDraft((cur) => ({ ...cur, ngConditions: { ...cur.ngConditions, [item.id]: e.target.checked } }))}
              />
              {item.label}
            </label>
          ))}
        </div>
      </div>

      <div className="f4h-card" style={{ padding: 18, display: "grid", gap: 12 }}>
        <div style={{ fontWeight: 800, fontSize: 15 }}>出力テンプレート</div>
        <label style={{ display: "grid", gap: 5, fontSize: 11.5, color: "var(--ink-soft)", fontWeight: 800 }}>
          Mode A 自前分析
          <textarea className="f4h-input" value={draft.templates?.A || ""} onChange={(e) => setTemplate("A", e.target.value)} style={{ minHeight: 90, resize: "vertical", fontSize: 12.5, lineHeight: 1.6 }} />
        </label>
        <label style={{ display: "grid", gap: 5, fontSize: 11.5, color: "var(--ink-soft)", fontWeight: 800 }}>
          Mode B 外部レポート検証
          <textarea className="f4h-input" value={draft.templates?.B || ""} onChange={(e) => setTemplate("B", e.target.value)} style={{ minHeight: 90, resize: "vertical", fontSize: 12.5, lineHeight: 1.6 }} />
        </label>
        <div>
          <button className="f4h-btn f4h-btn-primary f4h-focus" style={{ padding: "9px 16px" }} onClick={save}><Save size={14} /> 保存する</button>
        </div>
      </div>
    </div>
  );
}

function DataManagementPanel({ data, showToast, onResetAll }) {
  const [confirmReset, setConfirmReset] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div className="f4h-card" style={{ padding: 18 }}>
        <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>バックアップ・書き出し</div>
        <p style={{ fontSize: 12, color: "var(--ink-faint)", margin: "2px 0 14px" }}>
          全データは梅ヶ丘・狛江のスタッフ間で共有されています。念のため、定期的にバックアップを取ることをおすすめします。
        </p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button className="f4h-btn f4h-btn-outline f4h-focus" style={{ padding: "8px 14px" }}
            onClick={() => downloadJson(`4Hfitness_backup_${new Date().toISOString().slice(0, 10)}.json`, data)}>
            <Download size={14} /> 全データをバックアップ（JSON）
          </button>
          <button className="f4h-btn f4h-btn-outline f4h-focus" style={{ padding: "8px 14px" }}
            onClick={() => downloadCsv("体験者データ.csv", data.trials)}>
            <Download size={14} /> 体験者データをCSV出力
          </button>
          <button className="f4h-btn f4h-btn-outline f4h-focus" style={{ padding: "8px 14px" }}
            onClick={() => downloadCsv("入会者データ.csv", data.joins)}>
            <Download size={14} /> 入会者データをCSV出力
          </button>
        </div>
      </div>
      <div className="f4h-card" style={{ padding: 18, borderColor: "var(--red-soft)" }}>
        <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4, color: "var(--red)" }}>危険な操作</div>
        <p style={{ fontSize: 12, color: "var(--ink-faint)", margin: "2px 0 14px" }}>
          全店舗・全スタッフ分のデータを削除し、最初の状態に戻します。先にバックアップを取ることを強くおすすめします。
        </p>
        <button className="f4h-btn f4h-btn-danger f4h-focus" style={{ padding: "8px 14px" }} onClick={() => setConfirmReset(true)}>
          <Trash2 size={14} /> 全データをリセット
        </button>
      </div>
      <ConfirmDialog open={confirmReset} title="本当に全データをリセットしますか？"
        message="梅ヶ丘・狛江の全スタッフが共有しているデータです。体験者・入会者・実績・予算・スタッフ名簿のすべてが削除され、元に戻せません。"
        confirmLabel="削除して初期化する" onCancel={() => setConfirmReset(false)} onConfirm={() => { setConfirmReset(false); onResetAll(); }} />
    </div>
  );
}

function SettingsView({ data, updateData, showToast, onResetAll }) {
  const [tab, setTab] = useState("budget");
  return (
    <div className="f4h-fade-in" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <SectionHeading eyebrow="設定" title="ダッシュボードの設定" />
      <SubTabs tabs={[
        { key: "budget", label: "予算目標" }, { key: "staff", label: "スタッフ管理" },
        { key: "general", label: "一般設定" }, { key: "aiAssistant", label: "AI分析アシスタント" }, { key: "data", label: "データ管理" },
      ]} active={tab} onChange={setTab} />
      {tab === "budget" && <BudgetTargetsPanel data={data} updateData={updateData} showToast={showToast} />}
      {tab === "staff" && <StaffPanel data={data} updateData={updateData} showToast={showToast} />}
      {tab === "general" && <GeneralSettingsPanel data={data} updateData={updateData} showToast={showToast} />}
      {tab === "aiAssistant" && <AiAssistantSettingsPanel data={data} updateData={updateData} showToast={showToast} />}
      {tab === "data" && <DataManagementPanel data={data} showToast={showToast} onResetAll={onResetAll} />}
    </div>
  );
}

// ============================================================
// ルートアプリ
// ============================================================
export default function App() {
  const [data, setData] = useState(() => ({
    ...SEED_DATA,
    cancellations: { rows: [], importedAt: null, source: null },
    cancellationSurvey: emptyCancellationSurvey(),
    counselingReservations: [],
    counselingMeta: normalizeCounselingMeta(null),
    counselingActiveMembers: [],
    counselingNewMembers: [],
    counselingCancelMembers: [],
    aiAssistantSettings: defaultAiAssistantSettings(),
  }));
  const [syncing, setSyncing] = useState(true);
  const [nav, setNav] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  const showToast = useCallback((msg, error = false) => {
    setToast({ msg, error });
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3200);
  }, []);

  useEffect(() => {
    let alive = true;
    const fallbackTimer = setTimeout(() => {
      if (alive) { setSyncing(false); showToast("共有データへの接続に時間がかかっています。お使いの分はこの端末に表示されています。", true); }
    }, 9000);
    (async () => {
      try {
        await ensureSeeded();
        const all = await loadAllData();
        if (alive) { setData(all); }
      } catch (e) {
        if (alive) showToast("共有データの読み込みに失敗しました。初期データを表示しています。", true);
      } finally {
        if (alive) { setSyncing(false); clearTimeout(fallbackTimer); }
      }
    })();
    return () => { alive = false; clearTimeout(fallbackTimer); };
    // eslint-disable-next-line
  }, []);

  const updateData = useCallback(async (key, mutateFn) => {
    try {
      const next = await mutate(key, mutateFn);
      setData((d) => ({ ...d, [key]: next }));
    } catch (e) {
      showToast("保存に失敗しました。通信状態を確認してもう一度お試しください。", true);
    }
  }, [showToast]);

  const onResetAll = useCallback(async () => {
    const empty = {
      staff: [], trials: [], joins: [], memberMonthly: [], baselines: SEED_DATA.baselines,
      budgetTargets: [], revenueActuals: [], settings: SEED_DATA.settings,
      cancellations: { rows: [], importedAt: null, source: null },
      cancellationSurvey: emptyCancellationSurvey(),
      counselingReservations: [],
      counselingMeta: normalizeCounselingMeta(null),
      counselingActiveMembers: [],
      counselingNewMembers: [],
      counselingCancelMembers: [],
      aiAssistantSettings: defaultAiAssistantSettings(),
    };
    await Promise.all(Object.keys(empty).map((k) => sSet(SK[k], empty[k])));
    await sSet(SK.meta, { initialized: true, seededAt: new Date().toISOString(), version: 1, resetAt: new Date().toISOString() });
    setData(empty);
    showToast("全データをリセットしました");
  }, [showToast]);

  return (
    <div className="f4h-root" style={{ minHeight: "100vh" }}>
      <style>{GLOBAL_CSS}</style>
      <style>{"@keyframes spin { to { transform: rotate(360deg); } }"}</style>
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <NavRail active={nav} onChange={setNav} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        <main className="f4h-main-pad" style={{ flex: 1, minWidth: 0, padding: "20px 22px 40px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div className="f4h-mobile-menu-btn">
              <button className="f4h-btn f4h-btn-outline f4h-focus" style={{ padding: 8 }} onClick={() => setMobileOpen(true)} aria-label="メニュー">
                <Menu size={18} />
              </button>
            </div>
            {syncing && (
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11.5, color: "var(--ink-faint)", marginLeft: "auto" }}>
                <Loader2 size={12} style={{ animation: "spin 1s linear infinite" }} /> 共有データを同期中…
              </div>
            )}
          </div>
          {nav === "dashboard" && <DashboardView data={data} showToast={showToast} />}
          {nav === "entry" && <DataEntryView data={data} updateData={updateData} showToast={showToast} />}
          {nav === "monthlyReport" && <MonthlyReportView data={data} />}
          {nav === "cancellation" && <CancellationAnalysisView data={data} showToast={showToast} />}
          {nav === "counseling" && <CounselingAnalysisView data={data} updateData={updateData} showToast={showToast} onNavigate={setNav} />}
          {nav === "cvr" && <CvrAnalysisView data={data} />}
          {nav === "marketing" && (
            <React.Suspense fallback={<div style={{ padding: 24, color: "var(--ink-faint)" }}>読み込み中...</div>}>
              <MarketingApp />
            </React.Suspense>
          )}
          {nav === "compare" && <BudgetCompareView data={data} />}
          {nav === "settings" && <SettingsView data={data} updateData={updateData} showToast={showToast} onResetAll={onResetAll} />}
        </main>
      </div>
      <Toast toast={toast} />
    </div>
  );
}
