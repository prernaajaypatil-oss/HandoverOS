import { useEffect, useState } from "react";

function App() {
  const [backendStatus, setBackendStatus] = useState("Connecting...");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/health")
      .then((response) => response.json())
      .then((data) => {
        setBackendStatus("Connected");
      })
      .catch(() => {
        setBackendStatus("Offline");
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Header */}
      <header className="border-b border-slate-800 px-8 py-5">
        <div className="flex items-center justify-between">

          <div>
            <h1 className="text-2xl font-bold">
              HandoverOS
            </h1>

            <p className="text-sm text-slate-400">
              Evidence-first AI project handover
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <div className="h-2 w-2 rounded-full bg-green-400"></div>
            Backend {backendStatus}
          </div>

        </div>
      </header>


      {/* Main */}
      <main className="mx-auto max-w-6xl px-8 py-10">

        <div className="mb-8">
          <p className="text-sm text-slate-400">
            PROJECT
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            AI Customer Support Platform
          </h2>

          <p className="mt-2 text-slate-400">
            Project handover workspace
          </p>
        </div>


        {/* Project overview */}
        <div className="grid gap-5 md:grid-cols-3">

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">
              Evidence
            </p>

            <p className="mt-2 text-3xl font-bold">
              4
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Sources collected
            </p>
          </div>


          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">
              Decisions
            </p>

            <p className="mt-2 text-3xl font-bold">
              2
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Identified from evidence
            </p>
          </div>


          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">
              Risks
            </p>

            <p className="mt-2 text-3xl font-bold">
              1
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Needs attention
            </p>
          </div>

        </div>


        {/* Evidence */}
        <div className="mt-8 rounded-xl border border-slate-800 bg-slate-900 p-6">

          <div className="flex items-center justify-between">

            <div>
              <h3 className="text-xl font-semibold">
                Project Evidence
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                Information used to reconstruct project context.
              </p>
            </div>

            <button className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-200">
              + Add Evidence
            </button>

          </div>


          <div className="mt-6 space-y-3">

            <div className="rounded-lg border border-slate-800 bg-slate-950 p-4">
              <p className="font-medium">
                Meeting Notes
              </p>

              <p className="mt-1 text-sm text-slate-400">
                Team discussion about database architecture.
              </p>
            </div>


            <div className="rounded-lg border border-slate-800 bg-slate-950 p-4">
              <p className="font-medium">
                Architecture Document
              </p>

              <p className="mt-1 text-sm text-slate-400">
                Current technical architecture and dependencies.
              </p>
            </div>


            <div className="rounded-lg border border-slate-800 bg-slate-950 p-4">
              <p className="font-medium">
                Project Update
              </p>

              <p className="mt-1 text-sm text-slate-400">
                Latest development progress and blockers.
              </p>
            </div>


            <div className="rounded-lg border border-slate-800 bg-slate-950 p-4">
              <p className="font-medium">
                Task Notes
              </p>

              <p className="mt-1 text-sm text-slate-400">
                Current ownership and unfinished tasks.
              </p>
            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default App;