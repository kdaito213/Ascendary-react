import { Link } from "react-router-dom"
import { signOut } from "firebase/auth"
import { auth } from "./firebase"

function Header({mode, setMode, menuOpen, setMenuOpen}) {
    return (
        <header className={mode === "training" ? "training-fixed-header" : "competition-fixed-header"}>
            <nav className="header-content">

                {/* 上段 */}
                <div className="header-top">
                    <div className="mode-switch">
                        <span className={mode === "training" ? "active" : ""}>練習</span>
                        <label className="switch">
                            <input
                                type="checkbox"
                                checked={mode === "competition"}
                                onChange={(e) => {
                                    setMode(e.target.checked ? "competition" : "training")
                                }}
                            />
                            <span className="slider"></span>
                        </label>
                        <span className={mode === "competition" ? "active" : ""}>大会</span>
                    </div>

                    <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                        ☰
                    </div>
                </div>

                {/* メニュー（下段） */}
                <div className={`nav-links ${menuOpen ? "open" : ""}`}>
                    <Link to="/profile" onClick={() => setMenuOpen(false)}>
                        プロフィール
                    </Link>
                    <Link to="/" onClick={() => setMenuOpen(false)}>ダッシュボード</Link>
                    <Link to="/add" onClick={() => setMenuOpen(false)}>記録</Link>
                    <Link to="/records" onClick={() => setMenuOpen(false)}>一覧</Link>
                    <Link to="/graph" onClick={() => setMenuOpen(false)}>グラフ</Link>
                    <Link to="/team" onClick={() => setMenuOpen(false)}>チーム</Link>
                    <button onClick={async () => {
                        await signOut(auth)
                    }}>
                        ログアウト
                    </button>
                </div>

            </nav>
        </header>
    )
}

export default Header