import useI18n from "../../hooks/useI18n.ts";

function Statistics() {
	const { t } = useI18n();

	const stats = [
		{ key: "stat_1" },
		{ key: "stat_2" },
		{ key: "stat_3" },
		{ key: "stat_4" }
	];

	return (
		<section className="py-16 bg-gray-50">
			<div className="container mx-auto px-4">
				<div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
					{stats.map(({ key }) => (
						<div key={key}>
							<p className="text-4xl font-bold text-primary mb-2">
								{t(`components:landing.statistics.${key}.value`)}
							</p>
							<p className="text-gray-600">
								{t(`components:landing.statistics.${key}.label`)}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

export default Statistics;
