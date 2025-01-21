import { shipEngine } from "../../helper/shipengine";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        // Parse request body
        const { shipToAddress, packages } = await request.json();

        console.log("Received data:", {
            shipToAddress,
            packages,
        });

        // Validate shipToAddress and packages (basic check)
        if (!shipToAddress || !packages) {
            throw new Error("Invalid request: shipToAddress or packages missing.");
        }

        // ShipEngine API call
        const shipmentDetails = await shipEngine.getRatesWithShipmentDetails({
            shipment: {
                shipTo: shipToAddress, // Address from the form
                shipFrom: {
                    name: "Bandage", // Change to your store name
                    phone: "+923368952826", // Change to your store phone
                    addressLine1: "Kharadar, Karachi", // Change to your store address
                    addressLine2: "Defence, Karachi", // Optional
                    cityLocality: "Karachi", // Change to your store city
                    stateProvince: "Sindh", // Change to your store state
                    postalCode: "75500", // Change to your store postal code
                    countryCode: "PK", // Change to your store country code
                    addressResidentialIndicator: "no", // Set to "yes" if residential
                },
                packages: packages, // Package details from the form
            },
            rateOptions: {
                carrierIds: [
                    process.env.SHIPENGINE_FIRST_COURIER || "",
                    process.env.SHIPENGINE_SECOND_COURIER || "",
                    process.env.SHIPENGINE_THIRD_COURIER || "",
                    process.env.SHIPENGINE_FOURTH_COURIER || "",
                ].filter(Boolean), // Filter out empty carrier IDs
            },
        });

        console.log("Shipment details received:", shipmentDetails);

        // Return shipment details as JSON
        return NextResponse.json(shipmentDetails, { status: 200 });
    } catch (error: any) {
        // Log error to server console
        console.error("ShipEngine API error:", error);

        // Return error response to the client
        return NextResponse.json(
            {
                error: error.message || "An unexpected error occurred.",
            },
            { status: 500 }
        );
    }
}