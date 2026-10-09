<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep all public business contact details in the single `agency` configuration object so placeholders can be replaced safely; this prevents inconsistent phone, map, and address details.
- Business contact details live in `src/lib/agency.ts` and feed both the page and the assistant's instructions; one source keeps them consistent.
- The chat assistant streams from the server route `/api/chat` via Lovable AI; conversation is kept in sessionStorage so each browser session starts fresh.
