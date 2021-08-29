import { Module, createStore } from 'vuex-smart-module';
import auth from './modules/auth';
import frames from './modules/frames';
import galleries from './modules/galleries';
import galleryImages from './modules/gallery-images';

const root = new Module({
  modules: {
    auth,
    frames,
    galleries,
    galleryImages
  },
});

const store = createStore(root);

export default store;
