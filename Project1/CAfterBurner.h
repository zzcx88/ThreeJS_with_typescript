#pragma once
#include "CPlane.h"
#include "CPlaneMesh.h"

class CAfterBurner : public CPlane
{
public:
	XMFLOAT3					m_xmf3Position = XMFLOAT3(0.0f, 0.0f, 0.0f);
	XMFLOAT3					m_xmf3Right = XMFLOAT3(1.0f, 0.0f, 0.0f);
	XMFLOAT3					m_xmf3Up = XMFLOAT3(0.0f, 1.0f, 0.0f);
	XMFLOAT3					m_xmf3Look = XMFLOAT3(0.0f, 0.0f, 1.0f);
	XMFLOAT3					m_xmf3Velocity = XMFLOAT3(0.0f, 0.0f, 0.0f);

	CCamera* m_pCamera;
	//CTexture* pExeptTexture;

	float m_fScaleX = 1, m_fScaleY = 1;
	float m_fTimeElapsed = 0.f;

	float m_fDeleteFogFrequence = 1.0f;
	float m_DeleteElapsed = 0;

	float m_fFadeTimeElapsed = 0.f;
	float m_fFadeFrequence = 0.2f;

	int m_nTextureIndex = 0;

	bool m_RenderOff = false;
	bool m_bRefference = false;

public:
	CAfterBurner();
	CAfterBurner(int nIndex, ID3D12Device* pd3dDevice, ID3D12GraphicsCommandList* pd3dCommandList, ID3D12RootSignature* pd3dGraphicsRootSignature, float fWidth, float fHeight, float fDepth);
	virtual ~CAfterBurner();

	virtual void Animate(float fTimeElapsed);
	void TextureAnimate();
	void Render(ID3D12GraphicsCommandList* pd3dCommandList, CCamera* pCamera);
};

