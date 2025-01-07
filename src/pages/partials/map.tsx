import React, { Component } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

const defaultIcon = L.icon({
	iconUrl,
	iconRetinaUrl,
	shadowUrl,
	iconSize: [25, 41],
	iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = defaultIcon;

// interface OpenStreetMapProps {
//     surveyForm: any;
//     surveyFormData: any[];
// }
// class OpenStreetMap extends Component<OpenStreetMapProps> {

class OpenStreetMap extends Component {

	omponentDidMount(): void {
		// TODO
	}
	
	render() {
		return (
			<MapContainer
				center={[48.8566, 2.3522]}
				zoom={13}
				style={{ height: "90vh", width: "100%" }}
			>
				<TileLayer
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				/>

				<Marker position={[48.8566, 2.3522]}>
					<Popup>
						<b>Paris</b> <br />
						La ville lumière !
					</Popup>
				</Marker>
			</MapContainer>
		);
	}
}

export default OpenStreetMap;