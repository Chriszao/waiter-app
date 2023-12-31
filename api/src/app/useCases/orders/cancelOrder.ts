import { type Request, type Response } from 'express';

import { OrderModel } from '../../models';

export async function cancelOrder(req: Request, res: Response): Promise<Response> {
	try {
		const { orderId } = req.params;

		await OrderModel.findByIdAndDelete(orderId);

		return res.sendStatus(204);
	} catch (error) {
		console.error('An error occurred while canceling a order', error);

		return res.sendStatus(500);
	}
}
