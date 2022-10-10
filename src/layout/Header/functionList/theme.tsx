import { defineComponent, ref, reactive, computed, watch } from 'vue';
import { Setting } from '@element-plus/icons-vue';
import { useStoreApp } from '/@/stores/app';
// import { useI18n } from 'vue-i18n'
import themeIcon from './theme/theme-icon';
import themeColor from './theme/theme-color';
import { themeStyle, Colors } from '/@/theme/index';

interface Option {
	name: string;
	value: boolean;
	store: string;
}
interface State {
	style: string;
	primaryColor: string;
  primaryTextColor: string;
	menuType: string;
}
export default defineComponent({
	components: { themeIcon, themeColor, Setting },
	setup() {
		const store_app = useStoreApp();
		// const { t } = useI18n()
		// 只取值，不做computed
		const state: State = reactive({
			style: store_app.theme.state.style,
			primaryColor: store_app.theme.state.primaryColor,
			primaryTextColor: store_app.theme.state.primaryTextColor,
			menuType: store_app.theme.state.menuType,
		});
		const themeColorArr = [
			{ color: '#409eff', textColor: '#fff', tip: 'blue' },
			{ color: '#d60f20', textColor: '#fff', tip: 'red' },
			{ color: '#ac25e6', textColor: '#fff', tip: 'violet' },
			{ color: '#4dc86f', textColor: '#fff', tip: 'green' },
			{ color: '#13c2c2', textColor: '#fff', tip: 'cyan' },
			{ color: '#333', textColor: '#fff', tip: 'black' },
		];
		const setTheme = () => {
			const userTheme = themeStyle[state.style];
			const body = document.getElementsByTagName('body')[0];
			// 设置全局顶部body上的class名称，即为主题名称，便于自定义配置符合当前主题的样式统一入口
			body.setAttribute('data-theme', state.style);
			// 需要设置的颜色参照theme.scss，位置：assets/style/theme.scss
			// 设置主题色
			body.style.setProperty('--system-primary-color', state.primaryColor);
			for (let i in userTheme) {
				if (i === 'name') continue;
				const item: any = userTheme[i as keyof Colors];
				for (let y in item) {
					let cssVarName = '--system-' + i + '-' + y.replace(/([A-Z])/g, '-$1').toLowerCase();
					body.style.setProperty(cssVarName, item[y]);
				}
			}
		};
		// 监听数据的变化
		watch(state, (newVal) => {
			const theme = {
				state: { ...state },
			};
			store_app.stateChange({
				name: 'theme',
				value: theme,
			});
			setTheme();
		});
		let drawer = ref(false);
		const options = reactive([
			{ name: 'showLogo', value: store_app.showLogo, store: 'showLogo' },
			{ name: 'showBreadcrumb', value: store_app.showTabs, store: 'showTabs' },
			{ name: 'keepOnlyOneMenu', value: store_app.expandOneMenu, store: 'expandOneMenu' },
		]);

		const drawerChange = (value: boolean) => (drawer.value = value);
		const change = (option: Option) => store_app.stateChange({ name: option.store, value: option.value });
		setTheme();

		return () => (
			<>
				<div title="主题设置" onClick={() => drawerChange(true)}>
					<el-icon>
						<Setting />
					</el-icon>
				</div>
				<el-drawer title="主题设置" v-model={drawer.value} size="300px" show-close={false} direction="rtl">
					<h3>name</h3>
					<div class="theme-box">
						{Object.keys(themeStyle).map((row, index) => (
							<theme-icon
								v-model:active={state.style}
								key={index}
								name={row}
								tip={themeStyle[row].name}
								logo={themeStyle[row].logo.background}
								menu={themeStyle[row].menu.background}
								header={themeStyle[row].header.background}
								main={themeStyle[row].container.background}
								activeColor={themeStyle[row].page.color}
							/>
						))}
					</div>
					<h3>name</h3>
					<div class="theme-box">
						{themeColorArr.map((item, key) => (
							<theme-color
								v-model:active={state.primaryColor}
								v-model:activeTextColor={state.primaryTextColor}
								key={key}
								color={item.color}
								textColor={item.textColor}
								tip={item.tip}
							/>
						))}
					</div>
					<h3>name</h3>
					<div class="list">
						{options.map((option) => (
							<div class="list-item" key={option.name}>
								<span>{option.name}</span>
								<el-switch v-model={option.value} active-color="#13ce66" inactive-color="#ff4949" onChange={() => change(option)} />
							</div>
						))}
					</div>
				</el-drawer>
			</>
		);
	},
});
