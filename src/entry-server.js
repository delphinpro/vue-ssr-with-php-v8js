import { createApp } from '@/app';

const app = createApp(__PRELOAD_STATE__);

renderVueComponentToString(app.app, (err, res) => {
    if (err) throw new Error(err);
    print(res);
});
