#include "Shaders.hlsl"
//cbuffer cbCameraInfo : register(b1)
//{
//	matrix					gmtxView : packoffset(c0);
//	matrix					gmtxId : packoffset(c4);
//	matrix					gmtxProjection : packoffset(c8);
//	matrix					gmtxOrthProjection : packoffset(c12);
//	float3					gvCameraPosition : packoffset(c16);
//};
//
//cbuffer cbGameObjectInfo : register(b2)
//{
//	matrix		gmtxWorld : packoffset(c0);
//	uint		gnMaterialID : packoffset(c8);
//};
///////////////////////////////////////////////////////
struct VS_BILLBOARD_INSTANCING_INPUT
{
	float3 position : POSITION;
	float2 uv : TEXCOORD;
	float3 instancePosition : INSTANCEPOSITION;
};

struct VS_BILLBOARD_INSTANCING_OUTPUT
{
	float4 position : SV_POSITION;
	float2 uv : TEXCOORD;
};

VS_BILLBOARD_INSTANCING_OUTPUT VSBillboardInstancing(VS_BILLBOARD_INSTANCING_INPUT input)
{
	VS_BILLBOARD_INSTANCING_OUTPUT output;

	float3 f3Look = normalize(gvCameraPosition - input.instancePosition);
	float3 f3Up = float3(0.0f, 1.0f, 0.0f);
	float3 f3Right = normalize(cross(f3Look, f3Up));
	f3Up = normalize(cross(f3Right, f3Look));

	float length = distance(gvCameraPosition, input.instancePosition);

	matrix mtxWorld;
		mtxWorld[0] = float4(f3Right, 0.0f);
		mtxWorld[1] = float4(f3Up, 0.0f);
		mtxWorld[2] = float4(f3Look, 0.0f);
		mtxWorld[3] = float4(input.instancePosition, 1.0f);

	//if (length > 500)
	//{
		output.position = mul(mul(mul(float4(input.position, 1.0f), mtxWorld), gmtxView), gmtxProjection);
	//}
	output.uv = input.uv;

	return(output);
}
Texture2D gtxtTexture : register(t0);

float4 PSBillboardInstancing(VS_BILLBOARD_INSTANCING_OUTPUT input) : SV_TARGET
{
	float4 cColor = gtxtTexture.Sample(gssWrap, input.uv);
	//cColor.a = 0.7f;
	//clip(cColor.a - 0.5f);
	return(cColor);
}