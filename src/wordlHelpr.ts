const root = document.querySelector("#app");
if (typeof root != 'undefined' && root){
    root.innerHTML = `<div class="navbar">
    <div class="container">
        <a class="helprLogo" href="wordlHelpr.html">Wordl<span>Helpr</span></a>

        <nav>
            <ul class="primary-nav">
                <li><a class="helpr" href="wordlHelpr.html">Wordl<span>Helpr</span></a></li>
                <li><a class="battl" href="wordlBattl.html">Wordl<span>Battl</span></a></li>
            </ul>
            <ul class="secondary-nav">
                <li><a class="home" href="index.html">Main Site</a></li>
            </ul>
        </nav>
    </div>
</div>
<div class="game">
    <section class="player-board">
        <h2>Your Board</h2>
        <table class=game-rows>
            <tbody>
                <tr class="row">
                    <td class="row-letter">L</td>
                    <td class="row-letter"></td>
                    <td class="row-letter"></td>
                    <td class="row-letter"></td>
                    <td class="row-letter"></td>
                </tr>
                <tr class="row">
                    <td class="row-letter"></td>
                    <td class="row-letter"></td>
                    <td class="row-letter"></td>
                    <td class="row-letter"></td>
                    <td class="row-letter"></td>
                </tr>
                <tr class="row">
                    <td class="row-letter"></td>
                    <td class="row-letter"></td>
                    <td class="row-letter"></td>
                    <td class="row-letter"></td>
                    <td class="row-letter"></td>
                </tr>
                <tr class="row">
                    <td class="row-letter"></td>
                    <td class="row-letter"></td>
                    <td class="row-letter"></td>
                    <td class="row-letter"></td>
                    <td class="row-letter"></td>
                </tr>
                <tr class="row">
                    <td class="row-letter"></td>
                    <td class="row-letter"></td>
                    <td class="row-letter"></td>
                    <td class="row-letter"></td>
                    <td class="row-letter"></td>
                </tr>
                <tr class="row">
                    <td class="row-letter"></td>
                    <td class="row-letter"></td>
                    <td class="row-letter"></td>
                    <td class="row-letter"></td>
                    <td class="row-letter"></td>
                </tr>
            </tbody>
        </table>
        <p role="alert">&nbsp;</p>
        <button>Submit</button>
    </section>
    <section class="chat-box">
        What does text look like?
        What does text look like?
        What does text look like?
        What does text look like?
        What does text look like?
        What does text look like?
        What does text look like?
        What does text look like?
        What does text look like?
        What does text look like?
        What does text look like?
        What does text look like?
        What does text look like?
        What does text look like?
        What does text look like?
        What does text look like?
        What does text look like?
        What does text look like?
        What does text look like?
        What does text look like?
        What does text look like?
    </section>
</div>`;
}
