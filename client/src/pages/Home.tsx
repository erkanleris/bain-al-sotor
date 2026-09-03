/*
 * Design system: «صالون الليل التحريري» — keep the clue dominant, use ink navy
 * surfaces, Champagne Signal gold for decisions, and calm editorial motion.
 */
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clipboard,
  Copy,
  Crown,
  Gift,
  HelpCircle,
  Info,
  Instagram,
  Minus,
  Plus,
  RotateCcw,
  Settings2,
  Sparkles,
  Trophy,
  Users,
  X,
  Zap,
} from "lucide-react";

const LOGO_URL = "/manus-storage/bain-mark-clean_7421c5ab.png";
const AVATAR_URL = "/manus-storage/erkan-avatar_6d3ff5a9.png";
const REWARD_URL = "/manus-storage/erkan-reward_88b6a12e.png";
const TEXTURE_URL = "/manus-storage/bain-texture_e867f56b.png";

const palette = [
  "#E7B94A",
  "#D55BB4",
  "#44A9D7",
  "#79BD54",
  "#F38D3D",
  "#8756D7",
  "#37B1B0",
  "#E85D5D",
];

const baseNames = ["أحمد", "سارة", "محمد", "علي", "نور", "خالد", "لينا", "يوسف"];
const placeholderClues = [
  "التلميح التجريبي سيظهر هنا…",
  "عبارة Placeholder لجولة جديدة…",
  "المعنى مخبأ بين السطور…",
  "سؤال تجريبي ينتظر إجابتكم…",
];

interface Player {
  name: string;
  score: number;
  color: string;
}

function LogoLockup({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`logo-lockup ${compact ? "logo-lockup--compact" : ""}`}>
      <img src={LOGO_URL} alt="" className="brand-mark" />
      <div className="brand-copy">
        <span className="brand-kicker">لعبة اجتماعية</span>
        <span className="brand-name">بين السطور</span>
      </div>
    </div>
  );
}

function IntroScreen({ onStart }: { onStart: () => void }) {
  return (
    <main className="intro-screen">
      <div className="intro-frame">
        <div className="intro-orbit intro-orbit--one" />
        <div className="intro-orbit intro-orbit--two" />
        <div className="intro-topline">
          <span className="eyebrow"><Sparkles size={14} /> تجربة جماعية عربية</span>
          <span className="intro-index">01 / 01</span>
        </div>

        <section className="intro-content">
          <div className="intro-logo-wrap">
            <LogoLockup />
          </div>
          <div className="intro-divider"><span /><i>✦</i><span /></div>
          <p className="intro-welcome">مرحبًا بكم في لعبة</p>
          <h1>بين <em>السطور</em></h1>
          <p className="intro-description">
            لعبة تخمين جماعية تعتمد على التلميحات والسرعة والتعاون، مصممة لتشعل الحوار في كل جلسة.
          </p>

          <div className="developer-card">
            <div className="developer-avatar-ring">
              <img src={AVATAR_URL} alt="صورة توضيحية للمطور" className="developer-avatar" />
            </div>
            <div className="developer-info">
              <span>تطوير وتصميم</span>
              <strong>أركان لياريش</strong>
              <a href="https://instagram.com/erkanleris" target="_blank" rel="noreferrer">
                <Instagram size={16} /> @erkanleris
              </a>
            </div>
          </div>

          <button className="primary-cta intro-cta" onClick={onStart}>
            <span>ابدأ اللعب</span>
            <ArrowLeft size={19} />
          </button>
          <p className="intro-note"><Check size={14} /> ستظهر هذه الرسالة مرة واحدة فقط</p>
        </section>
      </div>
    </main>
  );
}

function Timer({ seconds }: { seconds: number }) {
  const progress = Math.max(0, Math.min(100, (seconds / 30) * 100));
  return (
    <div className={`timer ${seconds <= 8 ? "timer--urgent" : ""}`} aria-label={`متبقي ${seconds} ثانية`}>
      <div className="timer-ring" style={{ background: `conic-gradient(var(--gold) ${progress * 3.6}deg, rgba(255,255,255,.10) 0deg)` }}>
        <div className="timer-inner">
          <strong>{seconds}</strong>
          <span>ثانية</span>
        </div>
      </div>
      <div className="timer-copy">
        <span>وقت السؤال</span>
        <strong>{seconds <= 8 ? "اقتربت النهاية" : "فكر بسرعة"}</strong>
      </div>
    </div>
  );
}

function PlayerPanel({
  players,
  playerCount,
  targetScore,
  onAward,
}: {
  players: Player[];
  playerCount: number;
  targetScore: number;
  onAward: (index: number) => void;
}) {
  return (
    <aside className="panel players-panel">
      <div className="panel-heading">
        <div>
          <span className="section-label">الطاولة</span>
          <h2>اللاعبون</h2>
        </div>
        <span className="count-badge"><Users size={15} /> {playerCount} / 8</span>
      </div>
      <p className="panel-hint">اضغط على اسم اللاعب عند الإجابة الصحيحة لإضافة نقطة.</p>
      <div className="player-list">
        {players.map((player, index) => {
          const isActive = index < playerCount;
          return (
            <button
              key={`${player.name}-${index}`}
              className={`player-row ${isActive ? "" : "player-row--empty"}`}
              onClick={() => isActive && onAward(index)}
              disabled={!isActive}
              aria-label={isActive ? `إضافة نقطة إلى ${player.name}` : "خانة لاعب متاحة"}
            >
              <span className="player-rank" style={{ backgroundColor: isActive ? player.color : "rgba(255,255,255,.08)" }}>
                {isActive ? index + 1 : <Plus size={14} />}
              </span>
              <span className="player-name">{isActive ? player.name : "خانة متاحة"}</span>
              <span className="player-score">{isActive ? player.score : "—"}</span>
              {isActive && player.score >= targetScore - 1 && player.score < targetScore && <span className="near-win-dot" />}
            </button>
          );
        })}
      </div>
      <div className="tap-tip"><Zap size={15} /><span>كل نقرة = نقطة واحدة</span></div>
    </aside>
  );
}

function SettingsPanel({
  playerCount,
  targetScore,
  onPlayerCount,
  onTargetScore,
  onReset,
}: {
  playerCount: number;
  targetScore: number;
  onPlayerCount: (value: number) => void;
  onTargetScore: (value: number) => void;
  onReset: () => void;
}) {
  return (
    <aside className="panel settings-panel">
      <div className="panel-heading">
        <div>
          <span className="section-label">قبل البداية</span>
          <h2>إعدادات اللعبة</h2>
        </div>
        <Settings2 size={21} className="heading-icon" />
      </div>

      <div className="setting-block">
        <div className="setting-title-row">
          <span>عدد اللاعبين</span>
          <span className="setting-value">{playerCount} لاعبين</span>
        </div>
        <p>اختر من 4 إلى 8 لاعبين</p>
        <div className="stepper">
          <button onClick={() => onPlayerCount(Math.max(4, playerCount - 1))} aria-label="تقليل عدد اللاعبين"><Minus size={17} /></button>
          <strong>{playerCount}</strong>
          <button onClick={() => onPlayerCount(Math.min(8, playerCount + 1))} aria-label="زيادة عدد اللاعبين"><Plus size={17} /></button>
        </div>
      </div>

      <div className="setting-block target-setting">
        <div className="setting-title-row">
          <span>نقاط الفوز</span>
          <span className="setting-value"><Trophy size={14} /> {targetScore}</span>
        </div>
        <p>أول من يصل إلى الهدف يفوز</p>
        <div className="target-switcher">
          {[5, 10].map((score) => (
            <button key={score} className={targetScore === score ? "is-selected" : ""} onClick={() => onTargetScore(score)}>
              <Trophy size={16} />
              <span>{score} نقاط</span>
            </button>
          ))}
        </div>
      </div>

      <button className="secondary-cta reset-button" onClick={onReset}>
        <RotateCcw size={17} /> إعادة ضبط الجولة
      </button>
    </aside>
  );
}

function HowToModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="howto-modal" role="dialog" aria-modal="true" aria-labelledby="howto-title" onMouseDown={(event) => event.stopPropagation()}>
        <button className="icon-button modal-close" onClick={onClose} aria-label="إغلاق"><X size={18} /></button>
        <div className="modal-kicker"><HelpCircle size={16} /> كيف نلعب؟</div>
        <h2 id="howto-title">ثلاث خطوات<br /><em>وتبدأ الحكاية.</em></h2>
        <div className="howto-steps">
          <div><span>01</span><p>اقرأ التلميح بصوت واضح أمام الجميع.</p></div>
          <div><span>02</span><p>امنح اللاعبين 30 ثانية للتفكير والتخمين.</p></div>
          <div><span>03</span><p>اضغط اسم صاحب الإجابة الصحيحة لإضافة نقطة.</p></div>
        </div>
        <div className="modal-footer-note"><Info size={15} /> اللعبة الحالية تستخدم عبارات Placeholder للتصميم فقط.</div>
      </section>
    </div>
  );
}

function GameBoard() {
  const [playerCount, setPlayerCount] = useState(8);
  const [targetScore, setTargetScore] = useState(10);
  const [players, setPlayers] = useState<Player[]>(() => baseNames.map((name, index) => ({ name, score: 0, color: palette[index] })));
  const [seconds, setSeconds] = useState(30);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [winner, setWinner] = useState<Player | null>(() => new URLSearchParams(window.location.search).get("preview") === "win" ? { name: "أحمد", score: 10, color: palette[0] } : null);
  const [showHowTo, setShowHowTo] = useState(false);

  const currentClue = useMemo(() => placeholderClues[questionIndex % placeholderClues.length], [questionIndex]);

  useEffect(() => {
    if (winner) return;
    const interval = window.setInterval(() => {
      setSeconds((current) => {
        if (current <= 1) {
          setQuestionIndex((index) => index + 1);
          setAnswer("");
          toast("انتهى الوقت — سؤال جديد جاهز", { icon: <RotateCcw size={15} /> });
          return 30;
        }
        return current - 1;
      });
    }, 1000);
    return () => window.clearInterval(interval);
  }, [winner]);

  const nextQuestion = () => {
    setQuestionIndex((index) => index + 1);
    setSeconds(30);
    setAnswer("");
    toast("تم الانتقال إلى سؤال جديد", { icon: <Check size={15} /> });
  };

  const awardPoint = (index: number) => {
    if (winner || index >= playerCount) return;
    const updated = players.map((player, playerIndex) => playerIndex === index ? { ...player, score: player.score + 1 } : player);
    const updatedWinner = updated[index];
    setPlayers(updated);
    if (updatedWinner.score >= targetScore) {
      setWinner(updatedWinner);
    } else {
      toast(`نقطة لـ ${updatedWinner.name}`, { icon: <Sparkles size={15} /> });
    }
  };

  const resetGame = () => {
    setPlayers(baseNames.map((name, index) => ({ name, score: 0, color: palette[index] })));
    setSeconds(30);
    setQuestionIndex(0);
    setAnswer("");
    setWinner(null);
    toast("تمت إعادة ضبط الجولة", { icon: <RotateCcw size={15} /> });
  };

  const copyClue = async () => {
    try {
      await navigator.clipboard.writeText(currentClue);
      toast("تم نسخ العبارة", { icon: <Clipboard size={15} /> });
    } catch {
      toast("النسخ غير متاح في هذا المتصفح", { icon: <Info size={15} /> });
    }
  };

  return (
    <main className="game-shell" style={{ "--texture-url": `url(${TEXTURE_URL})` } as React.CSSProperties}>
      <div className="ambient-glow ambient-glow--one" />
      <div className="ambient-glow ambient-glow--two" />
      <header className="topbar">
        <div className="topbar-brand"><LogoLockup compact /></div>
        <div className="topbar-actions">
          <button className="quiet-button" onClick={() => setShowHowTo(true)}><HelpCircle size={17} /> <span>كيف نلعب؟</span></button>
          <button className="quiet-button quiet-button--exit" onClick={() => toast("هذه نسخة تصميمية — لا توجد جلسة للحفظ بعد", { icon: <Info size={15} /> })}><ArrowRight size={17} /> <span>الخروج</span></button>
        </div>
      </header>

      <section className="game-summary" aria-label="ملخص الجولة">
        <div className="summary-cell summary-players"><Users size={21} /><div><strong>{playerCount} / 8</strong><span>اللاعبون</span></div></div>
        <Timer seconds={seconds} />
        <div className="summary-cell summary-target"><Trophy size={22} /><div><strong>{targetScore}</strong><span>نقاط للفوز</span></div><ChevronDown size={18} className="summary-chevron" /></div>
      </section>

      <div className="game-layout">
        <SettingsPanel playerCount={playerCount} targetScore={targetScore} onPlayerCount={setPlayerCount} onTargetScore={setTargetScore} onReset={resetGame} />

        <section className="clue-card" aria-labelledby="clue-heading">
          <div className="clue-card-topline"><span className="question-index">السؤال <b>{String(questionIndex + 1).padStart(2, "0")}</b></span><span className="live-pill"><i /> جولة مباشرة</span></div>
          <div className="clue-heading-row"><span className="clue-label" id="clue-heading">العبارة</span><span className="line-decoration" /></div>
          <div className="clue-copy-wrap" key={questionIndex}>
            <p className="clue-copy">{currentClue}</p>
          </div>
          <button className="copy-button" onClick={copyClue}><Copy size={17} /> نسخ العبارة</button>
          <div className="answer-divider"><span>الإجابة</span></div>
          <form className="answer-form" onSubmit={(event) => { event.preventDefault(); nextQuestion(); }}>
            <input value={answer} onChange={(event) => setAnswer(event.target.value)} placeholder="اكتب الإجابة هنا…" aria-label="الإجابة" />
            <button type="submit" className="answer-submit" aria-label="سؤال جديد"><ArrowLeft size={18} /></button>
          </form>
          <button className="next-question" onClick={nextQuestion}><span>سؤال جديد</span><ChevronLeft size={17} /></button>
        </section>

        <PlayerPanel players={players} playerCount={playerCount} targetScore={targetScore} onAward={awardPoint} />
      </div>

      <div className="game-tip"><div className="tip-icon"><Zap size={18} /></div><p>عند الإجابة الصحيحة اضغط على اسم اللاعب لإضافة نقطة. السؤال سيتغير تلقائيًا بعد كل إجابة أو عند انتهاء الوقت.</p></div>

      <nav className="bottom-dock" aria-label="تنقل مساعد">
        <button className="dock-item dock-item--active" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}><span className="dock-dot" /><span>اللعبة</span></button>
        <button className="dock-item" onClick={() => setShowHowTo(true)}><Info size={17} /><span>عن اللعبة</span></button>
        <a className="dock-item" href="https://instagram.com/erkanleris" target="_blank" rel="noreferrer"><Instagram size={17} /><span>تواصل معنا</span></a>
      </nav>

      {showHowTo && <HowToModal onClose={() => setShowHowTo(false)} />}
      {winner && <VictoryScreen winner={winner} targetScore={targetScore} onNewGame={resetGame} />}
    </main>
  );
}

function VictoryScreen({ winner, targetScore, onNewGame }: { winner: Player; targetScore: number; onNewGame: () => void }) {
  return (
    <div className="victory-overlay">
      <div className="victory-confetti victory-confetti--one">✦</div>
      <div className="victory-confetti victory-confetti--two">✧</div>
      <div className="victory-confetti victory-confetti--three">✦</div>
      <section className="victory-card" role="dialog" aria-modal="true" aria-labelledby="victory-title">
        <div className="victory-badge"><Trophy size={18} /><span>نهاية الجولة</span></div>
        <div className="victory-trophy"><Crown size={31} /><span>الفائز</span></div>
        <h2 id="victory-title">مبروك يا <em>{winner.name}</em></h2>
        <div className="winner-score"><strong>{winner.score}</strong><span>نقطة</span><i>/ {targetScore}</i></div>
        <p className="victory-copy">لقد وصلت إلى القمة… وهذه الجولة لك.</p>
        <div className="reward-card">
          <div className="reward-copy"><span>هدية خاصة للفائز</span><strong>باقات اشتراك في تطبيق<br /><em>ERKAN AI</em></strong><small>مقدمة على حساب المطور</small></div>
          <img src={REWARD_URL} alt="هدية اشتراك ERKAN AI" className="reward-image" />
        </div>
        <div className="victory-developer"><img src={AVATAR_URL} alt="صورة توضيحية للمطور" /><div><span>الهدية مقدمة من</span><strong>أركان لياريش</strong><a href="https://instagram.com/erkanleris" target="_blank" rel="noreferrer"><Instagram size={15} /> @erkanleris</a></div></div>
        <div className="victory-actions"><button className="primary-cta" onClick={onNewGame}><RotateCcw size={17} /> لعبة جديدة</button><button className="secondary-cta" onClick={() => toast("يمكنك بدء جولة جديدة من الزر الذهبي", { icon: <Info size={15} /> })}><ArrowRight size={17} /> العودة للعبة</button></div>
      </section>
    </div>
  );
}

export default function Home() {
  const previewMode = new URLSearchParams(window.location.search).get("preview");
  const [showIntro, setShowIntro] = useState(() => {
    if (previewMode === "game" || previewMode === "win") return false;
    if (previewMode === "intro") return true;
    try {
      return window.localStorage.getItem("bain-al-sotor-intro-seen") !== "true";
    } catch {
      return true;
    }
  });

  const startGame = () => {
    try {
      window.localStorage.setItem("bain-al-sotor-intro-seen", "true");
    } catch {
      // The experience still works when storage is unavailable.
    }
    setShowIntro(false);
  };

  useEffect(() => {
    document.documentElement.lang = "ar";
    document.documentElement.dir = "rtl";
  }, []);

  return showIntro ? <IntroScreen onStart={startGame} /> : <GameBoard />;
}
