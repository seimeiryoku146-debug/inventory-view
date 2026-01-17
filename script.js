import { createClient } from "https://esm.sh/@supabase/supabase-js";

const SUPABASE_URL = "https://yirfxcotuftisegonswf.supabase.co"; // 自分のURLに置き換え
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlpcmZ4Y290dWZ0aXNlZ29uc3dmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgyOTUwNjIsImV4cCI6MjA4Mzg3MTA2Mn0.S_xva7CCmBZCaOG7BJ_cH0F5VAViCF8Pocgy6YKu-KM";    // 自分のanon keyに置き換え

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const statusEl = document.getElementById("status");
const tbody = document.querySelector("#items-table tbody");

async function loadItems() {
  statusEl.textContent = "読み込み中...";

  const { data, error } = await supabase
    .from("items2")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error(error);
    statusEl.textContent = "エラーが発生しました";
    return;
  }

  if (!data) {
    statusEl.textContent = "データが見つかりません";
    return;
  }

if (data.length === 0) {
    statusEl.textContent = "データが0件です";
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
        <td>${row.updated_at ?? ""}</td>
      </tr>`
    )
    .join("");
}


loadItems();





