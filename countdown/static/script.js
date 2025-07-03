document.getElementById('hasTime').addEventListener('change', (e) => {
    document.getElementById('releaseTime').style.display = e.target.checked ? 'inline-block' : 'none';
});

const form = document.getElementById('addForm');
const list = document.getElementById('countdownList');
const filter = document.getElementById('filterType');

let entries = [];

async function loadEntries() {
    const res = await fetch('/data');
    entries = await res.json();
    renderList();
}

form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const type = document.getElementById('type').value;
    const date = document.getElementById('releaseDate').value;
    const time = document.getElementById('releaseTime').value;
    const hasTime = document.getElementById('hasTime').checked;

    const releaseDateTime = hasTime && time ? `${date}T${time}` : date;

    const entry = { title, type, releaseDate: releaseDateTime };

    await fetch('/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry)
    });

    await loadEntries();
    form.reset();
    document.getElementById('releaseTime').style.display = 'none';
});

filter.addEventListener('change', renderList);

function renderList() {
    list.innerHTML = "";
    let filtered = [...entries];
    if (filter.value !== "all") {
        filtered = filtered.filter(e => e.type === filter.value);
    }

    filtered.sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate));

    filtered.forEach((entry, index) => {
        const card = document.createElement('div');
        card.className = 'card';

        const title = document.createElement('div');
        title.className = 'card-title';
        title.textContent = `${entry.title} (${entry.type})`;
        card.appendChild(title);

        const date = new Date(entry.releaseDate);
        const meta = document.createElement('div');
        meta.className = 'card-meta';
        meta.textContent = `Releasing: ${date.toLocaleString()}`;
        card.appendChild(meta);

        const countdown = document.createElement('div');
        countdown.className = 'countdown';
        card.appendChild(countdown);

        const delBtn = document.createElement('button');
        delBtn.textContent = 'Delete';
        delBtn.onclick = async () => {
            entries.splice(index, 1);
            await fetch('/data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(entries)
            });
            renderList();
        };
        card.appendChild(delBtn);

        list.appendChild(card);

        function updateCountdown() {
            const now = new Date();
            const diff = date - now;
            if (diff <= 0) {
                countdown.textContent = "Released!";
                countdown.style.color = "#ff4d6d";
            } else {
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((diff / (1000 * 60)) % 60);
                countdown.textContent = `${days}d ${hours}h ${minutes}m left`;
            }
        }

        updateCountdown();
        setInterval(updateCountdown, 60000);
    });
}

loadEntries();