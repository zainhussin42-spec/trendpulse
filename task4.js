// #TASK4 - zain_hussin

// =======================
const database = {
  p1: {
    id: "p1",
    author: { name: "Mira", email: "mira@trendpulse.dev", verified: true },
    content: "Meet @sara at the hub #js #async",
    engagement: { likes: 12, shares: 2, comments: 4 },
    createdAt: "2026-04-01T09:00:00.000Z",
  },
  p2: {
    id: "p2",
    author: { name: "Rami", email: "invalid-email", verified: false },
    content: "Checkout #node tutorials",
    engagement: { likes: 3 },
    createdAt: "2026-04-02T11:30:00.000Z",
  },
};

// =======================
// 1) describePostForUi
function describePostForUi(post) {
  const merged = Object.assign({}, post, {
    meta: { channel: "web" },
  });

  const authorName = post.author?.name ?? "Unknown";
  const keysCount = Object.keys(merged).length;

  return {
    title: post.id,
    authorName,
    keysCount,
  };
}

// =======================
// 2) getEngagementTotals
function getEngagementTotals(post) {
  return {
    likes: post.engagement?.likes ?? 0,
    shares: post.engagement?.shares ?? 0,
    comments: post.engagement?.comments ?? 0,
  };
}

// =======================
// 3) fetchPostById
function fetchPostById(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (database[id]) {
        resolve(Object.assign({}, database[id]));
      } else {
        reject("NOT_FOUND");
      }
    }, 30);
  });
}

// =======================
// 4) analyzePostText
const emailRegex = /^[\w.-]+@[\w.-]+\.\w{2,}$/;
const hashTagRegex = /#[\w؀-ۿ]+/g;
const mentionRegex = /@[\w]+/g;

function analyzePostText(post) {
  const emailValid = emailRegex.test(post.author?.email ?? "");
  const tags = post.content?.match(hashTagRegex) ?? [];
  const mentions = post.content?.match(mentionRegex) ?? [];

  return { emailValid, tags, mentions };
}

// =======================
// 6) Date
function formatIsoDateOnly(iso) {
  const d = new Date(iso);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function startRefreshDemo(onTick) {
  let n = 0;
  const id = setInterval(() => {
    n++;
    onTick(n);
    if (n >= 3) clearInterval(id);
  }, 200);
}

// =======================
// 7) runTrendPulsePhase2
async function runTrendPulsePhase2() {
  const ids = ["p1", "p2"];

  const summary = {
    loaded: 0,
    validEmails: 0,
    invalidAuthorId: null,
    datesFormatted: [],
  };

  for (const id of ids) {
    try {
      const post = await fetchPostById(id);
      summary.loaded++;

      const analysis = analyzePostText(post);

      if (analysis.emailValid) {
        summary.validEmails++;
      } else if (!summary.invalidAuthorId) {
        summary.invalidAuthorId = id;
      }

      summary.datesFormatted.push(formatIsoDateOnly(post.createdAt));
    } catch (err) {
      if (!summary.invalidAuthorId) summary.invalidAuthorId = id;
    }
  }

  return summary;
}

// =======================

(async () => {
  console.log("1) describePostForUi:");
  console.log(describePostForUi(database.p1));
  console.log(describePostForUi(database.p2));

  console.log("=========================================");

  console.log("2) getEngagementTotals:");
  console.log(getEngagementTotals(database.p1));
  console.log(getEngagementTotals(database.p2));

  console.log("=========================================");

  console.log("4) analyzePostText:");
  console.log(analyzePostText(database.p1));
  console.log(analyzePostText(database.p2));

  console.log("=========================================");

  console.log("6) formatIsoDateOnly:");
  console.log(formatIsoDateOnly("2026-04-04T10:00:00.000Z"));

  console.log("=========================================");

  console.log("6) startRefreshDemo:");
  console.log("=========================================");

  console.log("7) runTrendPulsePhase2:");
  const result = await runTrendPulsePhase2();
  console.log(result);

  // تشغيل المؤقت بعد كل شيء
  startRefreshDemo((tick) => console.log("Tick:", tick));
})();
