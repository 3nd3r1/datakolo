vim.api.nvim_create_autocmd({ "BufEnter" }, {
    pattern = { "*.js", "*.ts" },
    callback = function()
        local conform = require("conform")
        local filetype = vim.bo.filetype

        if vim.fn.expand("%:p"):match("/backend/") then
            conform.formatters_by_ft[filetype] = { "deno_fmt" }
        else
            conform.formatters_by_ft[filetype] = { "prettierd", "prettier" }
        end
    end
})
