# Pinned Tooling and Dependency Versions

Prepared 22 October 2026. Recorded for Phase 01 repository setup.

## 1. Environment Runtimes
| Tool | Installed Version | Notes |
| --- | --- | --- |
| **OS** | Windows 10/11 | Command shell: PowerShell |
| **Node.js** | `v24.20.0` | Active LTS |
| **npm** | `11.19.0` | Invoked via `npm.cmd` due to execution policy |
| **Git** | `2.56.0.windows.2` | Single repo: `oderindestephen-headless` |
| **Python** | `3.12.7` | Used for `tools/check-memory.py` |

## 2. Frontend Dependencies (`apps/web`)
| Package | Resolved Version | Purpose |
| --- | --- | --- |
| `next` | `15.4.11` | App Router, React Server Components |
| `react` | `19.3.1` | React core |
| `react-dom` | `19.3.1` | React DOM |
| `tailwindcss` | `3.4.19` | Utility-first styling with dark/blue brand tokens |
| `typescript` | `5.9.3` | Static typing with strict checks |
| `clsx` | `2.1.1` | Class name composition |
| `tailwind-merge` | `3.0.2` | Tailwind conflict resolution |
| `lucide-react` | `0.475.0` | UI icon library |
| `zod` | `3.25.76` | Runtime schema validation |
| `wrangler` | `3.114.17` | Cloudflare developer platform CLI |
| `@cloudflare/next-on-pages` | `1.13.16` | Cloudflare Pages Next.js deployment adapter |
