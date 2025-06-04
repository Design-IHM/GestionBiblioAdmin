import { GiBookPile } from "react-icons/gi";
import {DEFAULT_ORGANIZATION} from "../../config/firebase.ts";
import useI18n from "../../hooks/useI18n.ts";



function Footer() {
	const { t } = useI18n();
	const currentYear = new Date().getFullYear();

	return (
		<footer className="bg-gray-800 text-white py-8">
			<div className="container mx-auto px-4">
				<div className="flex flex-col md:flex-row justify-between items-center">
					<div className="flex items-center space-x-3 mb-4 md:mb-0">
						<GiBookPile className="w-8 h-8 text-white" />
						<div>
							<h1 className="text-lg font-bold text-white">{DEFAULT_ORGANIZATION || t('common:app_name')}</h1>
							<p className="text-xs text-white/70">{t('components:footer.powered_by')}</p>
						</div>
					</div>
					<div className="text-white/70 text-sm">
						&copy; {DEFAULT_ORGANIZATION || t('common:app_name')} {currentYear} {t('components:footer.copyright')}.
					</div>
				</div>
			</div>
		</footer>
	);
}

export default Footer;