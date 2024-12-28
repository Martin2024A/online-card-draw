/****************************************************************
 * 默认卡片数据
 ****************************************************************/
const defaultCards = [
  { box: "action", title: "整理文档", recommendedTime: "长期", weight: 2, detail: "清理无用文件，分类存储。" },
  { box: "fun", title: "观看电影", recommendedTime: "周末", weight: 1, detail: "选择一部喜欢的电影放松。" },
  { box: "decision", title: "做一个决定", recommendedTime: "第3个月", weight: 3, detail: "整理优劣，做出选择。" }
];

/****************************************************************
 * 初始化数据
 ****************************************************************/
let allCards = JSON.parse(localStorage.getItem("myCards")) || defaultCards.slice();

function saveCards() {
  localStorage.setItem("myCards", JSON.stringify(allCards));
}

/****************************************************************
 * 抽卡逻辑
 ****************************************************************/
function drawCard(boxType) {
  const boxCards = allCards.filter(c => c.box === boxType);
  if (boxCards.length === 0) return null;
  const totalWeight = boxCards.reduce((sum, card) => sum + (card.weight || 1), 0);
  const rand = Math.random() * totalWeight;
  let cumulative = 0;
  for (const card of boxCards) {
    cumulative += card.weight || 1;
    if (rand <= cumulative) return card;
  }
}

/****************************************************************
 * 渲染卡片
 ****************************************************************/
function displayCard(card) {
  const title = document.getElementById("cardTitle");
  const detail = document.getElementById("cardDetail");
  const icon = document.getElementById("cardBoxIcon");
  if (!card) {
    title.textContent = "暂无卡片";
    detail.textContent = "请添加卡片";
    return;
  }
  title.textContent = card.title;
  detail.textContent = card.detail;
  icon.innerHTML = `<i class="fa ${card.box === 'action' ? 'fa-fire' : card.box === 'fun' ? 'fa-smile-o' : 'fa-lightbulb-o'}"></i>`;
}

/****************************************************************
 * 页面事件绑定
 ****************************************************************/
document.getElementById("drawAction").onclick = () => displayCard(drawCard("action"));
document.getElementById("drawFun").onclick = () => displayCard(drawCard("fun"));
document.getElementById("drawDecision").onclick = () => displayCard(drawCard("decision"));
