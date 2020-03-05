import Vue from 'vue';
import { Tabbar, TabbarItem } from 'vant';

Vue.use(Tabbar).use(TabbarItem);
import { Loading } from 'vant';

Vue.use(Loading);
import { Grid, GridItem } from 'vant';

Vue.use(Grid).use(GridItem);

import { Toast } from 'vant';

Vue.use(Toast);
import { Dialog } from 'vant';

// 全局注册
Vue.use(Dialog);
import { NavBar } from 'vant';

Vue.use(NavBar)
import { ContactCard, ContactList, ContactEdit } from 'vant';

Vue
    .use(ContactCard)
    .use(ContactList)
    .use(ContactEdit);
import { AddressList } from 'vant';

Vue.use(AddressList);
import { AddressEdit } from 'vant';

Vue.use(AddressEdit);
import { Cell, CellGroup } from 'vant';

Vue.use(Cell).use(CellGroup);
import { SubmitBar } from 'vant';

Vue.use(SubmitBar);
import { Icon } from 'vant';

Vue.use(Icon);
import { Button } from 'vant';

Vue.use(Button);
import { Tab, Tabs } from 'vant';

Vue.use(Tab).use(Tabs);
import { Swipe, SwipeItem } from 'vant';

Vue.use(Swipe).use(SwipeItem);
import {
    GoodsAction,
    GoodsActionIcon,
    GoodsActionButton
  } from 'vant';
  
  Vue
    .use(GoodsAction)
    .use(GoodsActionIcon)
    .use(GoodsActionButton);
import { Sku } from 'vant';
Vue.use(Sku);
import { Search } from 'vant';

Vue.use(Search);
