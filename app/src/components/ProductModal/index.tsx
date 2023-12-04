import { FlatList, Modal } from 'react-native';

import type { Product } from '~/@types/product';
import { formatCurrency } from '~/utils/formatCurrency';

import { Button } from '../Button';
import { Close } from '../Icons/Close';
import { Text } from '../Text';
import * as S from './styles';

interface ProductModalProps {
	visible: boolean;
	onClose: () => void;
	product: Product | null;
	onAddToCart: (product: Product) => void;
}

export function ProductModal({ visible, onClose, product, onAddToCart }: ProductModalProps) {
	if (!product) {
		return null;
	}

	function handleAddToCart() {
		onAddToCart(product!);
		onClose();
	}

	return (
		<Modal
			visible={visible}
			animationType="slide"
			presentationStyle="pageSheet"
			onRequestClose={onClose}
		>
			<S.Image source={{ uri: `http://192.168.0.23:3001/uploads/${product.imagePath}` }}>
				<S.CloseButton onPress={onClose}>
					<Close />
				</S.CloseButton>
			</S.Image>

			<S.Body>
				<S.Header>
					<Text weight="600" size={24}>
						{product.name}
					</Text>

					<Text color="#666" style={{ marginTop: 8 }}>
						{product.description}
					</Text>
				</S.Header>

				{product.ingredients.length > 0 && (
					<S.IngredientsContainer>
						<Text weight="600" color="#666">
							Ingredientes
						</Text>

						<FlatList
							style={{ marginTop: 16 }}
							data={product.ingredients}
							keyExtractor={(product) => product.id}
							showsVerticalScrollIndicator={false}
							renderItem={({ item: ingredient }) => (
								<S.Ingredient>
									<Text>{ingredient.icon}</Text>

									<Text color="#666" size={14} style={{ marginLeft: 20 }}>
										{ingredient.name}
									</Text>
								</S.Ingredient>
							)}
						/>
					</S.IngredientsContainer>
				)}
			</S.Body>

			<S.Footer>
				<S.FooterContainer>
					<S.PriceContainer>
						<Text color="#666">Preço</Text>

						<Text size={20} weight="600">
							{formatCurrency(product.price)}
						</Text>
					</S.PriceContainer>

					<Button onPress={handleAddToCart}>Adicionar ao pedido</Button>
				</S.FooterContainer>
			</S.Footer>
		</Modal>
	);
}
