import { defineComponent } from 'vue';
// import { useRoute } from 'vue-router'
// import { useStoreApp } from '/@/stores/app'
// import { useI18n } from 'vue-i18n'
// import { changeTitle } from '/@/utils/title'
export default defineComponent({
	setup() {
		// const { locale, t } = useI18n()
		// const route = useRoute()
		// const store_app = useStoreApp()
		// 国际化语言切换
		const handleCommand = (command: string) => {
			console.log(command);
			// locale.value = command
			// store_app.stateChange({ name: 'lang', value: command })
			// changeTitle(route.meta.title)
			// document.querySelector('html')!.setAttribute('lang', command)
		};
		return () => (
			<el-dropdown
				onCommand={handleCommand}
				size="default"
				v-slots={{
					dropdown: () => (
						<el-dropdown-menu>
							{/* {$i18n.messages.map((locale, key) => (
								<el-dropdown-item key={`locale-${locale.message.language}`} command={key} disabled={name === key}>
									{locale.message.language}
								</el-dropdown-item>
							))} */}
							<el-dropdown-item>English</el-dropdown-item>
						</el-dropdown-menu>
					),
				}}
			>
				<span class="el-dropdown-link">
					<i class="el-icon el-tooltip__trigger" style="font-size: 20px;">
						<svg preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" width="1em" height="1em">
							<path
								fill="currentColor"
								d="m18.5 10l4.4 11h-2.155l-1.201-3h-4.09l-1.199 3h-2.154L16.5 10h2zM10 2v2h6v2h-1.968a18.222 18.222 0 0 1-3.62 6.301a14.864 14.864 0 0 0 2.336 1.707l-.751 1.878A17.015 17.015 0 0 1 9 13.725a16.676 16.676 0 0 1-6.201 3.548l-.536-1.929a14.7 14.7 0 0 0 5.327-3.042A18.078 18.078 0 0 1 4.767 8h2.24A16.032 16.032 0 0 0 9 10.877a16.165 16.165 0 0 0 2.91-4.876L2 6V4h6V2h2zm7.5 10.885L16.253 16h2.492L17.5 12.885z"
							></path>
						</svg>
					</i>
				</span>
			</el-dropdown>
		);
	},
});
