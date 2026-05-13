import { useNavigate } from "react-router-dom"

function HowTo() {
    const navigate = useNavigate()
    
    return (
        <div>
            <div>
                <style>{`
                    .indent-all {
                        margin-left: 2em;
                    }
                `}</style>
                <h2>Ascendaryの使い方</h2>
                <h3>Ascendaryへようこそ。</h3>
                <p className="indent-all"> このアプリは, 毎日の練習を記録し, 成長を可視化することで継続的なスキル向上をサポートします。</p>
            </div>
            <div>
                <h3>基本的な使い方</h3>

                <h4>1. アカウントを作成</h4>
                <div className="indent-all">
                    <p>まず新規登録またはログインを行います。</p>
                </div>

                <h4>2. 技を記録</h4>
                <div className="indent-all">
                    <p>練習したい技を追加します。</p>
                    <p>自分だけの練習リストを作成できます。</p>
                </div>

                <h4>3. 練習を記録</h4>
                <div className="indent-all">
                    <p>練習した日や練習回数を記録します。</p>
                    <p>簡単に入力できるよう設計しています。</p>
                </div>

                <h4>4. 成長を確認</h4>
                <div className="indent-all">
                    <p>記録したデータはグラフや記録一覧で確認できます。</p>
                    <p>日々の成長や継続状況を可視化できます。</p>
                </div>


            </div>

            <h3>各機能の紹介</h3>

            <h4>ダッシュボード</h4>
            <div className="indent-all">
                <p>練習回数や継続日数などを確認できます。</p>
                <p>現在の成長状況を一目で把握できます。</p>
            </div>

            <h4>記録機能</h4>
            <div className="indent-all">
                <p>練習した技や大会結果を簡単に保存できます。</p>
                <p>日々の取り組みを継続的に記録できます。</p>
            </div>

            <h4>一覧機能</h4>
            <div className="indent-all">
                <p>過去の記録を一覧で確認できます。</p>
                <p>いつどのような練習をしたか振り返ることができます。</p>
            </div>

            <h4>グラフ機能</h4>
            <div className="indent-all">
                <p>記録したデータをグラフで可視化できます。</p>
                <p>練習量や成長の変化を分かりやすく確認できます。</p>
            </div>

            <h4>チーム機能</h4>
            <div className="indent-all">
                <p>他のユーザーの活動状況を確認できます。</p>
                <p>仲間と刺激し合いながら継続できます。</p>
            </div>

            <h4>プロフィール機能</h4>
            <div className="indent-all">
                <p>自分のアカウント情報を管理できます。</p>
                <p>活動履歴や利用状況を確認できます。</p>
            </div>
            
            <br></br>

            <p style={{ color: "red", cursor: "pointer"}} onClick={() => navigate("/signup")}>
                新規登録はこちら
            </p>

        </div>

    )
}

export default HowTo