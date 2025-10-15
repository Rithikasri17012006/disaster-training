import React, { useState } from "react";
import { Heart, DollarSign, Users, TrendingUp } from "lucide-react";
import { Card, CardHeader, CardContent } from "../ui/card";

// Sample donation data
const donations = [
	{
		id: 1,
		date: "21 Jan 2024, 04:00 pm",
		amount: "₹100",
		status: " Not Yet confirmed",
		project: "Kerala Flood Relief 2024",
		details: {
			blockHeight: 976170,
			gasUsed: 49179,
			confirmations: 48,
			method: "UPI",
			impact: "Provided 20 liters of clean water",
			disaster: "Kerala Flood Relief 2024",
			location: "Kerala, India",
			ngo: "Kerala Relief Foundation",
			hash: "0x1a2b3c4d5e6f7g8h9i0j",
		},
	},
	{
		id: 2,
		date: "21 Jan 2024, 02:45 pm",
		amount: "₹500",
		status: "confirmed",
		project: "Himachal Pradesh Landslide",
		details: {
			blockHeight: 981250,
			gasUsed: 47200,
			confirmations: 43,
			method: "UPI",
			impact: "Provided 50 food packets",
			disaster: "Himachal Pradesh Landslide",
			location: "Himachal Pradesh, India",
			ngo: "Himalayan Relief Trust",
			hash: "0x2b3c4d5e6f7g8h9i0j1k",
		},
	},
];

const FundsDonations: React.FC = () => {
	const [expandedRow, setExpandedRow] = useState<number | null>(null);
	const [verified, setVerified] = useState<Record<number, boolean>>({});

	const toggleExpand = (id: number) => {
		setExpandedRow(expandedRow === id ? null : id);
	};

	const verifyDonation = (id: number) => {
		setVerified({ ...verified, [id]: true });
	};

	const stats = [
		{
			title: "Total Funds",
			value: "120,000",
			icon: <DollarSign className="h-6 w-6 text-green-600" />,
			iconBg: "bg-green-100",
		},
		{
			title: "Active Donors",
			value: "58",
			icon: <Users className="h-6 w-6 text-blue-600" />,
			iconBg: "bg-blue-100",
		},
		{
			title: "Campaigns Running",
			value: "3",
			icon: <TrendingUp className="h-6 w-6 text-emerald-600" />,
			iconBg: "bg-emerald-100",
		},
		{
			title: "Pending Requests",
			value: "4",
			icon: <Heart className="h-6 w-6 text-pink-600" />,
			iconBg: "bg-pink-100",
		},
	];

	return (
		<div className="space-y-6">
			{/* Stats Row */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
				{stats.map((stat, index) => (
					<Card key={index}>
						<CardHeader>
							<div className="flex justify-between items-center">
								<p className="text-gray-600 text-sm font-medium">{stat.title}</p>
								<div className={`p-2 rounded-xl ?{stat.iconBg}`}>
									{stat.icon}
								</div>
							</div>
						</CardHeader>
						<CardContent>
							<h2 className="text-3xl font-bold text-gray-900 mt-2">
								{stat.value}
							</h2>
						</CardContent>
					</Card>
				))}
			</div>

			{/* Donation Table */}
			<div className="mt-8">
				<h3 className="text-xl font-semibold mb-4 text-gray-800">
					Recent Donations
				</h3>
				<div className="overflow-x-auto rounded-xl border border-gray-200">
					<table className="min-w-full bg-white border border-gray-300 rounded-xl shadow-sm">
						<thead>
							<tr className="bg-gray-100 text-left">
								<th className="p-3">Date</th>
								<th className="p-3">Project</th>
								<th className="p-3">Amount</th>
								<th className="p-3">Status</th>
								<th className="p-3">Proof Check</th>
							</tr>
						</thead>
						<tbody>
							{donations.map((donation) => (
								<React.Fragment key={donation.id}>
									<tr className="border-b hover:bg-gray-50 transition">
										<td className="p-3">{donation.date}</td>
										<td className="p-3">{donation.project}</td>
										<td className="p-3">{donation.amount}</td>
										<td className="p-3 font-medium">
											{verified[donation.id] ? (
												<span className="text-green-600">Verified</span>
											) : (
												<span className="text-orange-600">
													Not Yet Verified
												</span>
											)}
										</td>
										<td className="p-3">
											<button
												onClick={() => toggleExpand(donation.id)}
												className="text-blue-600 hover:underline"
											>
												{expandedRow === donation.id
													? "Hide Proof"
													: "Proof Check"}
											</button>
										</td>
									</tr>

									{/* Inline Side Expand */}
									{expandedRow === donation.id && (
										<tr className="bg-gray-50">
											<td colSpan={5} className="p-4">
												<div className="grid grid-cols-2 gap-6">
													<div>
														<h3 className="font-semibold mb-2 text-gray-700">
															Transaction Details
														</h3>
														<p>
															<b>Block Height:</b> {donation.details.blockHeight}
														</p>
														<p>
															<b>Gas Used:</b> {donation.details.gasUsed}
														</p>
														<p>
															<b>Confirmations:</b>{" "}
															{donation.details.confirmations}
														</p>
														<p>
															<b>Payment Method:</b> {donation.details.method}
														</p>
														<p>
															<b>Impact:</b> {donation.details.impact}
														</p>
													</div>
													<div>
														<h3 className="font-semibold mb-2 text-gray-700">
															Disaster Information
														</h3>
														<p>
															<b>Disaster:</b> {donation.details.disaster}
														</p>
														<p>
															<b>Location:</b> {donation.details.location}
														</p>
														<p>
															<b>NGO Partner:</b> {donation.details.ngo}
														</p>
														<p>
															<b>Transaction Hash:</b> {donation.details.hash}
														</p>
														<button
															onClick={() => verifyDonation(donation.id)}
															className={`mt-3 px-3 py-1 rounded-md text-white ?{
																verified[donation.id]
																	? "bg-green-500"
																	: "bg-blue-600 hover:bg-blue-700"
															}`}
															disabled={verified[donation.id]}
														>
															{verified[donation.id]
																? "Donation Verified"
																: "Verify"}
														</button>
													</div>
												</div>
											</td>
										</tr>
									)}
								</React.Fragment>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default FundsDonations;
