import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';

export default async function (token, cartItems) {
    
    function getItemIDs(items) {
        let ids = [];
        for(const item of items) {
            ids.push(item.productId);
        }
        return ids;
    }
    const itemIDs = getItemIDs(cartItems.lineItems.physicalItems);
    console.log("itemIDs");
    console.log(itemIDs);
    
    const productMetadata = await getProductMetadataFromCartItems(itemIDs);
    
    async function getProductMetadataFromCartItems(itemIDs) {
        try {
            let metadata = [];
            for (const id of itemIDs) {
                
                let productMetadataPT = await getProductMetadata(id, "Plant Therapy");
                console.log(productMetadataPT);
                
                let productMetadataSalsify = await getProductMetadata(id, "salsify");
                console.log(productMetadataSalsify);
                
                // if (productMetadata === null) {
                //
                //     if (productMetadata !== null) {
                //         metadata.push(productMetadata);
                //     }
                // } else {
                //     metadata.push(productMetadata);
                // }
            }
            return metadata;
        } catch(e) {
            console.log(e);
        }
    }
    
    // async function getProductMetadata(itemID, namespace) {
    async function getProductMetadata(itemID, namespace) {
        try {
            const client = new ApolloClient({
                headers: { Authorization: `Bearer ${token}` },
            });
            const response = await client.query({
                query: gql`
            query productById {
                site {
                    product(entityId: ${itemID}) {
                        id
                        entityId
                        name
                        plainTextDescription
                        metafields(namespace: "${namespace}") {
                            edges{
                                node{
                                    id
                                    entityId
                                    key
                                    value
                                }
                            }
                        }
                    }
                }
            }
        `,
            });
            if(response.data.site.product.metadata.edges.length > 0) {
            
            }
        } catch(e) {
            console.log(e);
        }
    }
    
    function isAnyProductCBD(productMetadata) {
        console.log("CART CONTAINS CBD");
        // console.log(productMetadata.length);
        // for(let i = 0;i < productMetadata.length; i++) {
        // if(productMetadata.data.site.product.metafields.edges)
        // }
        return true;
    }
    
    return isAnyProductCBD(productMetadata);
    // const cartContainsCBD = await doesCartContainCBD(itemIDs);
    // console.log("cartContainsCBD");
    // console.log(cartContainsCBD);
}
