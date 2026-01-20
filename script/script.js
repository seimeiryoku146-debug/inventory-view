import { createClient } from "https://esm.sh/@supabase/supabase-js";

const SUPABASE_URL = ""; // 自分のURLに置き換え
const SUPABASE_ANON_KEY = "";    // 自分のanon keyに置き換え

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const statusEl = document.getElementById("status");
const tbody = document.querySelector("#items-table tbody");
const nowtime =()=> {return new Date()};

async function loadItems() {
  document.getElementById("update").textContent = nowtime();
  
  statusEl.textContent = "読み込み中...";

  const { data, error } = await supabase
    .from("items")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error(error);
    statusEl.textContent = "エラーが発生しました";
    return;
  }

if (!data || data.length === 0) {
  statusEl.textContent = "データがありません";
  return;
}
  
  statusEl.textContent = `件数: ${data.length}`;

  tbody.innerHTML = data
    .map(
      (row) => `
      <tr>
        <td>${row.id}</td>
        <td>${row.name ?? ""}</td>
        <td>${row.category1 ?? ""}</td>
        <td>${row.category2 ?? ""}</td>
        <td>${row.quantity ?? ""}</td>
      </tr>`
    )
    .join("");
}


loadItems();
















